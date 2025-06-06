import Hacker from '../Models/hacker.js'
import Company from '../Models/company.js'
import bcryptjs from 'bcryptjs'
import mailSender from '../Utils/maiSender.js'
import dotenv from 'dotenv'
import resetPasswordTemplate from '../Templates/resetPasswordEmailTemplate.js'
import Jwt from 'jsonwebtoken'

dotenv.config()

//genrate the token to resetpassword
export const resetPasswordToken = async (req, res) => {
  try {
    //user data only email is req to send token
    const { email, userType } = req.body

    if (!email || !userType) {
      return res.status(409).json({
        success: false,
        message: 'email is required',
      })
    }
    let user

    if (userType === 'hacker') {
      user = await Hacker.findOne({ email: email })
    } else if (userType === 'company') {
      user = await Company.findOne({ email: email })
    }

    // if (!user) {
    //   return res.status(400).json({
    //     success: false,
    //     message: 'Unable not found with this email ',
    //   })
    // }

    //gen token uuid
    const token = Jwt.sign({ userType: userType }, process.env.JWT_SECRET)

    //genrate the unique url to send token
    if (userType === 'hacker') {
      await Hacker.findOneAndUpdate(
        { email: email },
        {
          token: token,
          resetPasswordExpires: Date.now() + 5 * 60 * 1000 * 1000,
        },
        { new: true }
      )
    } else if (userType === 'company') {
      await Company.findOneAndUpdate(
        { email: email },
        {
          token: token,
          resetPasswordExpires: Date.now() + 5 * 60 * 1000,
        },
        { new: true }
      )
    }

    //genrate url send an email with link

    const url = `${process.env.RESET_URL}resetpassword/${token}`

    //send the url in mail
    await mailSender(email, 'Password reset link ', resetPasswordTemplate(url))

    return res.status(200).json({
      success: true,
      message: 'Email send successfully to reset password',
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Unable to reset password ',
    })
  }
}

//acctual reset password

export const resetPassword = async (req, res) => {
  try {
    const { newPassword, confirmPassword, token } = req.body

    const decode = await Jwt.verify(token, process.env.JWT_SECRET)

    decode.userType
    console.log('type', decode.userType)

    if ((!newPassword || !confirmPassword || !token|| !decode.userType)) {
      return res.status(409).json({
        success: false,
        message: 'All feilds are required',
      })
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    if (!passwordRegex.test(newPassword)) {
      return res.status(400).json({
        success: false,
        message:
          'Password must contain at least 8 characters, including uppercase, lowercase, number, and special character.',
      })
    }
    if (newPassword !== confirmPassword) {
      return res.status(401).json({
        success: false,
        message: `Password does't matched`,
      })
    }

    if (decode.userType === 'hacker') {
      const oldPassword = await Hacker.findOne({ token: token })

      if (await bcryptjs.compare(newPassword, oldPassword.password)) {
        return res.status(401).json({
          success: false,
          message: 'Old and New Password can not be same',
        })
      }
    } else if (decode.userType === 'company') {
      const oldPassword = await Company.findOne({ token: token })

      if (await bcryptjs.compare(newPassword, oldPassword.password)) {
        return res.status(401).json({
          success: false,
          message: 'Old and New Password can not be same',
        })
      }
    }

    //get userdateils and update them

    const userDetails =
      (await Hacker.findOne({ token: token })) ||
      (await Company.findOne({ token: token }))

    if (!userDetails) {
      return res.status(401).json({
        success: false,
        message: 'No token found',
      })
    }

    if (userDetails.resetPasswordExpires < Date.now()) {
      return res.status(401).json({
        success: false,
        message: 'Token is expire  , please try again',
      })
    }

    const hashPassword = await bcryptjs.hash(newPassword, 10)

    if (decode.userType === 'hacker') {
      await Hacker.findOneAndUpdate(
        { token: token },
        { password: hashPassword },
        { new: true }
      )
    } else if (decode.userType === 'company') {
      await Company.findOneAndUpdate(
        { token: token },
        { password: hashPassword },
        { new: true }
      )
    }

    return res.status(200).json({
      success: true,
      message: 'Password reset successfully',
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Something went wrong while reseting the password',
    })
  }
}
