import Hacker from '../Models/hacker.js';
import Company from '../Models/company.js';
import otpGenerator from 'otp-generator';
import Otp from '../Models/otp.js';
import bcryptjs from 'bcryptjs';
import Jwt from 'jsonwebtoken';

// Helper function for generating a JWT token
const generateToken = (user, userType) => {
  const payload = {
    email: user.email,
    id: user._id,
    userType,
  };

  return Jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '4h',
  });
};

// Send OTP
export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if the user already exists
    const existingUser =
      (await Hacker.findOne({ email })) || (await Company.findOne({ email }));

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'User already registered',
      });
    }

    // Generate OTP
    let genOtp;
    let result;
    do {
      genOtp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
        digits: true,
      });
      result = await Otp.findOne({ otp: genOtp });
    } while (result);

    // Store OTP in database
    const otpPayload = { email, otp: genOtp };
    await Otp.create(otpPayload);

    // Return success response without exposing the OTP
    res.status(200).json({
      success: true,
      message: 'OTP sent successfully',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Sign up
export const signUp = async (req, res) => {
  try {
    const { name, email, password, confirmPassword, otp, userType, domain } = req.body;

    if (!name || !email || !password || !confirmPassword || !otp || !userType) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      });
    }

    // Password validation
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        success: false,
        message:
          'Password must contain at least 8 characters, including uppercase, lowercase, number, and special character.',
      });
    }

    if (password !== confirmPassword) {
      return res.status(409).json({
        success: false,
        message: "Passwords don't match",
      });
    }

    // Validate OTP
    const recentOtp = await Otp.findOne({ email })
      .sort({ createdAt: -1 })
      .limit(1);

    if (!recentOtp || (Date.now() - recentOtp.createdAt.getTime()) > 10 * 60 * 1000) {
      return res.status(400).json({
        success: false,
        message: 'OTP expired or not found',
      });
    }

    if (recentOtp.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: 'OTP does not match',
      });
    }

    // Hash password
    const hashPassword = await bcryptjs.hash(password, 10);

    // Create user entry in the database
    const seed = Math.random().toString(36).substring(7);

    if (userType === 'hacker') {
      const hacker = await Hacker.create({
        name,
        email,
        password: hashPassword,
        image: `https://api.dicebear.com/9.x/bottts-neutral/svg?seed=${seed}`,
      });

      return res.status(200).json({
        success: true,
        message: 'Hacker registered successfully',
        hacker,
      });
    } else if (userType === 'company') {
      if (!domain) {
        return res.status(400).json({
          success: false,
          message: 'Domain is required for companies',
        });
      }

      const company = await Company.create({
        name,
        email,
        password: hashPassword,
        domain,
        image: `https://api.dicebear.com/9.x/initials/svg?seed=${name}`,
      });

      return res.status(200).json({
        success: true,
        message: 'Company registered successfully',
        company,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: 'Unable to register',
    });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { email, password, userType } = req.body;

    if (!email || !password || !userType) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      });
    }

    let user;
    if (userType === 'hacker') {
      user = await Hacker.findOne({ email });
    } else if (userType === 'company') {
      user = await Company.findOne({ email });
    }

    if (!user) {
      return res.status(401).json({
        success: false,
        message: `${userType} not registered! Please sign up.`,
      });
    }

    if (await bcryptjs.compare(password, user.password)) {
      const token = generateToken(user, userType);

      // Create cookie
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };

      user.password = undefined; // Remove password from response

      return res.cookie('token', token, options).status(200).json({
        success: true,
        token,
        user,
        message: 'Logged in successfully',
      });
    } else {
      return res.status(401).json({
        success: false,
        message: 'Incorrect password',
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: 'Unable to login',
    });
  }
};

// Change password
export const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword, newConfirmPassword } = req.body;

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegex.test(newPassword)) {
      return res.status(400).json({
        success: false,
        message:
          'Password must contain at least 8 characters, including uppercase, lowercase, number, and special character.',
      });
    }

    if (!oldPassword || !newPassword || !newConfirmPassword) {
      return res.status(409).json({
        success: false,
        message: 'All fields are required',
      });
    }

    if (newPassword !== newConfirmPassword) {
      return res.status(409).json({
        success: false,
        message: "New password doesn't match",
      });
    }

    let user;
    if (req.hacker) {
      user = await Hacker.findById(req.hacker.id);
    } else if (req.company) {
      user = await Company.findById(req.company.id);
    }

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    if (!(await bcryptjs.compare(oldPassword, user.password))) {
      return res.status(400).json({
        success: false,
        message: 'Old password is incorrect',
      });
    }

    if (oldPassword === newPassword) {
      return res.status(409).json({
        success: false,
        message: "Old and new password can't be the same",
      });
    }

    user.password = await bcryptjs.hash(newPassword, 10);
    await user.save();

    return res.status(200).json({
      success: true,
      message: 'Password changed successfully',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: 'Unable to change password',
    });
  }
};
