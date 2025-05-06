import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import Tab from './Tab'
import { Link } from 'react-router'
import { assets } from '../../assets/assets'

const SignUp = () => {
  const navigate = useNavigate()
  const [userType, setUserType] = useState('hacker')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    country: '',
    password: '',
    confirmPassword: '',
  })

  const { name, email, country, password, confirmPassword } = formData

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Signup with:', { ...formData, userType })
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
      <div className="w-full max-w-md bg-black/50 backdrop-blur-sm p-6 rounded-xl shadow-lg">
        <h2 className="text-3xl font-semibold text-center mb-4 text-white">
          Sign Up
        </h2>

        {/* Tabs */}
        <Tab field={userType} setField={setUserType} />

        <form onSubmit={handleSubmit} className="flex flex-col gap-5 mt-4">
          <div>
            <label className="text-sm font-semibold text-gray-300">
              Name
              <sup className="text-red-500">*</sup>
            </label>{' '}
            <input
              type="text"
              name="name"
              value={name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full mt-1 p-3 bg-gray-800 text-gray-200 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-300">
              Email
              <sup className="text-red-500">*</sup>
            </label>{' '}
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full mt-1 p-3 bg-gray-800 text-gray-200 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-300">
              Country
              <sup className="text-red-500">*</sup>
            </label>{' '}
            <input
              type="text"
              name="country"
              value={country}
              onChange={handleChange}
              placeholder="Enter your country"
              className="w-full mt-1 p-3 bg-gray-800 text-gray-200 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-300">
              Password
              <sup className="text-red-500">*</sup>
            </label>{' '}
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full mt-1 p-3 bg-gray-800 text-gray-200 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-300">
              Confirm Password
              <sup className="text-red-500">*</sup>
            </label>{' '}
            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              className="w-full mt-1 p-3 bg-gray-800 text-gray-200 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all duration-200"
          >
            Sign Up
          </button>

          <p className="text-center text-sm text-gray-400 mt-3">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-blue-400 hover:underline transition-all duration-200"
            >
              Login here
            </Link>
          </p>

          <p
            className="mt-4 text-sm text-blue-400 cursor-pointer hover:underline text-center"
            onClick={() => navigate('/termCondition')}
          >
            Terms & Conditions
          </p>
        </form>
      </div>
    </div>
  )
}

export default SignUp
