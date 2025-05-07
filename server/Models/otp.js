import mongoose from 'mongoose'
import mailSender from '../Utils/maiSender.js'
import mailtemplate from '../Templates/OtpEmailTemplate.js'

const OtpScheema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },

  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 15000,
  },
})

//middleware for otp
// function

const sendVerificationMail = async (email, otp) => {
  try {
    const mailRes = await mailSender(
      email,
      'Signup Verification Email For LaunchProgram',
      mailtemplate(otp)
    )
    console.log('otp mail ', mailRes)
  } catch (error) {
    console.error('Error Occour While Sending mail', error)
    throw error
  }
}

//premiddlerware

OtpScheema.pre('save', async function (next) {
  await sendVerificationMail(this.email, this.otp)
  next()
})

const Otp = mongoose.model('Otp', OtpScheema)
export default Otp
