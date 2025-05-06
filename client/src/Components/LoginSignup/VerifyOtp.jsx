import React, { useState } from 'react'
import Button from '../Button/Button'
import OTP from './OTP'
import { assets } from '../../assets/assets'

const VerifyOtp = () => {
  const [otp, setOtp] = useState('')

  const handleOnSubmit = (e) => {
    e.preventDefault()
    const { firstName, lastName, email, password, confirmPass } = signupData

    setTimeout(() => {
      dispatch(
        signup(firstName, lastName, email, password, confirmPass, otp, navigate)
      )
    }, 5000)
  }

  return (
    <div
      className="w-full min-h-[100vh] bg-[#000816] flex items-center justify-center px-4"
      style={{
        backgroundColor: '#0e0e0e',
        backgroundImage: `linear-gradient(rgba(22,93,251,0.8), rgba(10,50,125,0.6)), url(${assets.loginsignbg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="w-full max-w-[480px] sm:max-w-[500px] md:max-w-[600px] lg:max-w-[650px] flex flex-col gap-6 py-8 px-6 sm:px-10 md:px-12 rounded-xl bg-white/5 border border-gray-500 shadow-xl">
        <div className="flex flex-col gap-3 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl text-white font-semibold">
            Verify Email OTP
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-400">
            A verification code has been sent to you. Enter the code below
          </p>
        </div>

        <form onSubmit={handleOnSubmit} className="w-full flex flex-col gap-6">
          <OTP otpCount={6} setOtp={setOtp} />
          <div className="flex justify-center">
            <Button text="Verify OTP" type="submit" />
          </div>
        </form>
      </div>
    </div>
  )
}

export default VerifyOtp
