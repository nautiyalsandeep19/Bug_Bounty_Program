import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import Button from '../Button/Button'
import { useDispatch } from 'react-redux'
import { assets } from '../../assets/assets'
import { resetPassword } from '../../Services/resetPassword'

const ResetPassword = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { token } = useParams()

  const [formData, setFormData] = useState({
    newPassword: '',
    confirmNewPassword: '',
  })

  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState(null)

  const { newPassword, confirmNewPassword } = formData

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters long.')
      return
    }

    if (newPassword !== confirmNewPassword) {
      setError('Passwords do not match.')
      return
    }

    setError(null)
    dispatch(resetPassword(newPassword, confirmNewPassword, token, navigate))
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-10 text-white"
      style={{
        backgroundColor: '#0e0e0e',
        backgroundImage: `linear-gradient(rgba(22,93,251,0.8), rgba(10,50,125,0.6)), url(${assets.loginsignbg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <form
        onSubmit={handleOnSubmit}
        className="bg-[#2048A4] backdrop-blur-md p-8 rounded-lg shadow-lg w-full max-w-md flex flex-col gap-4"
      >
        <h1 className="text-2xl font-semibold text-center mb-2">
          Reset Your Password
        </h1>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-gray-300">
            New Password <sup className="text-red-500">*</sup>
          </label>
          <input
            required
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter New Password"
            name="newPassword"
            value={newPassword}
            onChange={handleOnChange}
            className="w-full mt-1 p-3 bg-transparent text-gray-200 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-gray-300">
            Confirm New Password <sup className="text-red-500">*</sup>
          </label>
          <input
            required
            type={showPassword ? 'text' : 'password'}
            placeholder="Confirm New Password"
            name="confirmNewPassword"
            value={confirmNewPassword}
            onChange={handleOnChange}
            className="w-full mt-1 p-3 bg-transparent text-gray-200 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-2 text-sm mt-2">
          <input
            type="checkbox"
            id="showPassword"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
            className="cursor-pointer"
          />
          <label htmlFor="showPassword" className="cursor-pointer">
            Show Password
          </label>
        </div>

        <Button type="submit" text="Reset Password" className="w-full mt-4" />
      </form>
    </div>
  )
}

export default ResetPassword
