import express from 'express'
import { login, sendOtp, signUp } from '../Controller/auth.js'
const router = express.Router()

router.post('/sendOtp', sendOtp)
router.post('/signUp', signUp)
router.post('/login', login)

export default router
