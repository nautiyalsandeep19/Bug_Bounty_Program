import express from 'express'
import { changePassword, login, sendOtp, signUp } from '../Controller/auth.js'
import { authMid } from '../Middleware/authMid.js'
import {
  resetPasswordToken,
  resetPassword,
} from '../Controller/resetPassword.js'

const router = express.Router()

router.post('/sendOtp', sendOtp)
router.post('/signUp', signUp)
router.post('/login', login)

//protected route only uses when the user logged in
router.post('/changePassword', authMid, changePassword)

//route to reset password token
router.post('/resetPasswordToken', resetPasswordToken)

//route for reset password
router.post('/resetPassword', resetPassword)

export default router
