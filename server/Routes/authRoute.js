import express from 'express'
import { changePassword, login, sendOtp, signUp } from '../Controller/auth.js'
import { authMid } from '../Middleware/authMid.js'
import {
  resetPasswordToken,
  resetPassword,
} from '../Controller/resetPassword.js'

import { loginLimiter, otpLimiter } from '../Middleware/rateLimiter.js'
import {
  changePasswordValidator,
  signUpValidator,
} from '../Validator/authValidator.js'
import { validate } from '../Middleware/validate.js'
import { loginValidator } from '../Validator/authValidator.js'

const router = express.Router()

router.post('/sendOtp', otpLimiter, sendOtp)
router.post('/signUp', signUpValidator, validate, signUp)
router.post('/login', loginLimiter, loginValidator, validate, login)

//protected route only uses when the user logged in
router.post(
  '/changePassword',
  authMid,
  changePasswordValidator,
  validate,
  changePassword
)

//route to reset password token
router.post('/resetPasswordToken', otpLimiter, resetPasswordToken)

//route for reset password
router.post('/resetPassword', resetPassword)

export default router
