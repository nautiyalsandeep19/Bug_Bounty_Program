import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import Tab from './Tab'
import { Link } from 'react-router'
import { assets } from '../../assets/assets'
import countryList from '../../assets/country.json'
import { useDispatch } from 'react-redux'
import { setSignupData } from '../../Slices/authSlice'
import { sendOtp } from '../../Services/authApi'
import Button from '../Button/Button'

const SignUp = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [userType, setUserType] = useState('hacker')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    country: '',
    password: '',
    confirmPassword: '',
    domain: '',
  })

  const { name, email, password, confirmPassword, country, domain } = formData

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const signupformData = { ...formData, userType }
    console.log(signupformData)

    dispatch(setSignupData(signupformData))
    dispatch(
      sendOtp(
        name,
        email,
        password,
        confirmPassword,
        country,
        userType,
        domain,
        navigate
      )
    )
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
      <div className="w-full max-w-md bg-[#2048A4] backdrop-blur-sm p-6 rounded-xl shadow-lg">
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
              className="w-full mt-1 p-3 bg-transparent text-gray-200 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="w-full mt-1 p-3 bg-transparent text-gray-200 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-300">
              Country
              <sup className="text-red-500">*</sup>
            </label>
            <select
              name="country"
              value={country}
              onChange={handleChange}
              required
              className="w-full mt-1 p-3 bg-transparent text-gray-200 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled className="h-[300px]">
                Select your country
              </option>
              {countryList.map((countryItem, index) => (
                <option key={index} value={countryItem.country}>
                  {countryItem.country}
                </option>
              ))}
            </select>
          </div>
          {userType === 'company' && (
            <div>
              <label className="text-sm font-semibold text-gray-300">
                Domain
                <sup className="text-red-500">*</sup>
              </label>{' '}
              <input
                type="text"
                name="domain"
                value={domain}
                onChange={handleChange}
                placeholder="Enter your domain"
                className="w-full mt-1 p-3 bg-transparent text-gray-200 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          )}
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
              className="w-full mt-1 p-3 bg-transparent text-gray-200 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="w-full mt-1 p-3 bg-transparent text-gray-200 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <Button text="Sign Up" type="submit" />

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
