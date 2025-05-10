import Hacker from '../Models/hacker.js'
import Company from '../Models/company.js'
import otpGenerator from 'otp-generator'
import Otp from '../Models/otp.js'
import bcryptjs from 'bcryptjs'
import Jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

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
    console.log('email', email)

    //genrate otp
    var genOtp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
      digits: true,
    })

    console.log(genOtp)

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
    console.log(otpBody)

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
  console.log('req', req.body)

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
    console.log(domain, 'hii')

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

//Login
export const login = async (req, res) => {
  try {
    const { email, password, userType } = req.body

    if (!email || !password || !userType) {
      return res.status(401).json({
        success: false,
        message: 'All feilds are required',
      })
    }
    console.log(email, password)

    let user
    if (userType === 'hacker') {
      user = await Hacker.findOne({ email })
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'hacker not registerd ! please sign up',
        })
      }
      console.log(user)

      console.log('frontend', password)
      console.log('encrypted password from backend', user.password)

      console.log('hiii', await bcryptjs.compare(password, user.password))

      //compare
      if(await bcryptjs.compare(password, user.password)) {

        const payLoad = {
          email: user.email,
          id: user._id,
          userType: userType,
        }
        //genrate jwttoken
        const token = Jwt.sign(payLoad, process.env.JWT_SECRET, {
          expiresIn: '4h',
        })

        user.token = token
        user.password = undefined

        //create cookie
        const options = {
          expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
          httpOnly: true,
        }

        res.cookie('token', token, options).status(200).json({
          success: true,
          token,
          user,
          message: 'logged in successfully',
        })

        // return res.status(200).json({
        //   success: true,
        //   message: 'User Login Successfully',
        //   user,
        //   token,
        // })
      } else {
        return res.status(401).json({
          success: false,
          message: 'password is incorrect',
        })
      }
    } else if (userType === 'company') {
      user = await Company.findOne({ email })
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'user not registerd ! please sign up',
        })
      }
      console.log(user)

      console.log('frontend', password)
      console.log('encrypted password from backend', user.password)

      //genrate jwttoken

      console.log('hiii', await bcryptjs.compare(password, user.password))
      if (await bcryptjs.compare(password, user.password)) {
        const payLoad = {
          email: user.email,
          id: user._id,
          userType: userType,
        }
        const token = Jwt.sign(payLoad, process.env.JWT_SECRET, {
          expiresIn: '4h',
        })

        user.token = token
        user.password = undefined

        //create cookie

        const options = {
          expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
          httpOnly: true,
        }

        res.cookie('token', token, options).status(200).json({
          success: true,
          token,
          user,
          message: 'logged in successfully',
        })

        // return res.status(200).json({
        //   success: true,
        //   message: 'User Login Successfully',
        //  user,
        //   token,
        // })
      } else {
        return res.status(401).json({
          success: false,
          message: 'password is incorrect',
        })
      }
    }
  } catch (error) {
    console.log(error)

    return res.status(500).json({
      success: false,
      message: 'Unable to login ',
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

    console.log('hacker', req.hacker)
    console.log('company', req.company)
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
