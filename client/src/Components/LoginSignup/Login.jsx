import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { assets } from '../../assets/assets'
import Tab from './Tab'
import { useDispatch } from 'react-redux'
import { login } from '../../Services/authApi'
import Button from '../Button/Button'
import { resetPasswordToken } from '../../Services/resetPassword'
import { toast } from 'react-hot-toast'

const Login = () => {
  const [userType, setUserType] = useState('hacker')
  const [formData, setFormData] = useState({ email: '', password: '' })
  const { email, password } = formData
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(login(email, password, userType, navigate))
    console.log('Login with:', { ...formData, userType })
  }

  const handleForgetPassword = () => {
    console.log('Forget Password Clicked on login page front')

    if (email) {
      dispatch(resetPasswordToken(email, userType, navigate))
    } else {
      toast.error('Enter Email')
    }
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
      <div className="w-full max-w-md bg-[#2048A4] backdrop-blur-sm p-6 rounded-xl shadow-lg">
        <h2 className="text-3xl font-semibold text-center mb-4">Login</h2>

        {/* Tabs */}
        <Tab field={userType} setField={setUserType} />

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Email */}
          <div>
            <label className="text-sm font-semibold text-gray-300">
              Email <sup className="text-red-500">*</sup>
            </label>
            <input
              required
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full mt-1 p-3 bg-transparent text-gray-200 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-semibold text-gray-300">
              Password <sup className="text-red-500">*</sup>
            </label>
            <input
              required
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full mt-1 p-3 bg-transparent text-gray-200 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="text-right mt-1">
              <button
                type="button"
                onClick={handleForgetPassword}
                className="text-[#2B7FFF] hover:text-[#00D4FF] text-sm cursor-pointer"
              >
                Forget Password?
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <Button text="Login" type="submit" />

          {/* Signup link */}
          <p className="text-center text-sm text-gray-400 mt-3">
            New here?{' '}
            <Link
              to="/signup"
              className="text-blue-400 hover:underline transition-all duration-200"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login
