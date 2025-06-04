import Hacker from '../Models/hacker.js'
import Company from '../Models/company.js'
import otpGenerator from 'otp-generator'
import Otp from '../Models/otp.js'
import bcryptjs from 'bcryptjs'
import Jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import redisClient from '../Config/redisClient.js'

dotenv.config()
//send otp
export const sendOtp = async (req, res) => {
  try {
    //fetch email from body
    const {
      name,
      email,
      password,
      confirmPassword,
      country,
      userType,
      domain,
    } = req.body

    if (!name || !email || !password || !confirmPassword || !userType) {
      return res.status(400).json({
        success: false,
        message: 'All feilds are required',
      })
    }

    //creating a regexformat password
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        success: false,
        message:
          'Password must contain at least 8 characters, including uppercase, lowercase, number, and special character.',
      })
    }
    if (password !== confirmPassword) {
      return res.status(409).json({
        success: false,
        message: "Password doesn't matched",
      })
    }

    //check existing user
    const existingUser =
      (await Hacker.findOne({ email })) || (await Company.findOne({ email }))

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'User Already Registered',
      })
    }
  

    //genrate otp
    var genOtp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
      digits: true,
    })

 

    let result = await Otp.findOne({ otp: genOtp })
    while (result) {
      var genOtp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
        digits: true,
      })
    }
    result = await Otp.findOne({ otp: genOtp })

    //entry in db
    const otpPayload = { email, otp: genOtp }

    const otpBody = await Otp.create(otpPayload)
  

    res.status(200).json({
      success: true,
      message: 'Otp Send Successfullty',
      genOtp,
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

//signup
export const signUp = async (req, res) => {
  

  try {
    const { name, email, password, country, domain, otp, userType } = req.body

    if (!otp || !userType) {
      return res.status(400).json({
        success: false,
        message: 'All feilds are required',
      })
    }
    //  validate Otp
    const recentOtp = await Otp.findOne({ email })
      .sort({ createdAt: -1 })
      .limit(1)

    if (recentOtp === null) {
      return res.status(400).json({
        success: false,
        message: 'Otp not found!',
      })
    } else if (recentOtp.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: 'Otp not matched!',
      })
    }

    //password encryption

    const hashPassword = await bcryptjs.hash(password, 10)

    //create entry in db
    const seed = Math.random().toString(36).substring(7)
    if (userType === 'hacker') {
      const hacker = await Hacker.create({
        name,
        email,
        password: hashPassword,
        country,
        image: `https://api.dicebear.com/9.x/bottts-neutral/svg?seed=${seed}`,
      })

      return res.status(200).json({
        success: true,
        message: 'Hacker registered successfully  ',
        hacker,
      })
    } else if (userType === 'company') {
      if (!domain) {
        return res.status(400).json({
          success: false,
          message: 'Domain required',
        })
      }

      const company = await Company.create({
        name,
        email,
        password: hashPassword,
        country,
        domain,
        image: `https://api.dicebear.com/9.x/initials/svg?seed=${name}`,
      })

      return res.status(200).json({
        success: true,
        message: 'Company registered successfully  ',
        company,
      })
    }
  } catch (error) {
    console.log(error)

    return res.status(500).json({
      success: false,
      message: 'Unable to register ',
    })
  }
}


export const login = async (req, res) => {
  try {
    const { email, password, userType } = req.body

    if (!email || !password || !userType) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      })
    }

    let user

    if (userType === 'hacker') {
      user = await Hacker.findOne({ email })
    } else if (userType === 'company') {
      user = await Company.findOne({ email })
    } else {
      return res.status(400).json({
        success: false,
        message: 'Invalid user type',
      })
    }

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User not registered! Please sign up.',
      })
    }

    const isPasswordMatch = await bcryptjs.compare(password, user.password)
    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: 'Password is incorrect',
      })
    }

    const payLoad = {
      email: user.email,
      id: user._id,
      userType,
    }

    const token = Jwt.sign(payLoad, process.env.JWT_SECRET, {
      expiresIn: '4h',
    })

    user.token = token
    user.password = undefined // hide password in response

    const cookieOptions = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days
      httpOnly: true,
    }

    return res.cookie('token', token, cookieOptions).status(200).json({
      success: true,
      token,
      user,
      userType,
      message: 'Logged in successfully',
    })
  } catch (error) {
    console.error('Login error:', error)
    return res.status(500).json({
      success: false,
      message: 'Unable to login. Please try again later.',
    })
  }
}

//chnage passwrod
export const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword, newConfirmPassword } = req.body

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    if (!passwordRegex.test(newPassword)) {
      return res.status(400).json({
        success: false,
        message:
          'Password must contain at least 8 characters, including uppercase, lowercase, number, and special character.',
      })
    }
    if (!oldPassword || !newPassword || !newConfirmPassword) {
      return res.status(409).json({
        success: false,
        message: 'All feilds are required ',
      })
    }
    if (newPassword !== newConfirmPassword) {
      return res.status(409).json({
        success: false,
        message: `NewPassword does't match`,
      })
    }

  
    let user
    if (req.hacker) {
      user = await Hacker.findById(req.hacker.id)
    } else if (req.company) {
      user = await Company.findById(req.company.id)
    }

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      })
    }

    //compare the old and stored password in db

    if (!(await bcryptjs.compare(oldPassword, user.password))) {
      return res.status(400).json({
        success: false,
        message: 'Old password is incorrect',
      })
    }

    //repace the old password and save new pass
    if (oldPassword === newPassword) {
      return res.status(409).json({
        success: false,
        message: `Old and New password can't be same`,
      })
    }
    user.password = await bcryptjs.hash(newPassword, 10)
    await user.save()

    return res.status(200).json({
      success: true,
      message: 'Password changed successfully',
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      message: 'Unable to change password ',
    })
  }
}

//logout

export const logout = async (req, res) => {
  try {
    const token = req.cookies.token

    if (token) {
      const decoded = Jwt.decode(token)
      const expiry = decoded.exp
      const ttl = expiry - Math.floor(Date.now() / 1000)

      await redisClient.set(`bl_${token}`, 'true', { EX: ttl }) // Blacklist with TTL
    }

    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
    })

    res.status(200).json({
      success: true,
      message: 'Logout successful',
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Internal server error: ${error.message}`,
    })
  }
}
