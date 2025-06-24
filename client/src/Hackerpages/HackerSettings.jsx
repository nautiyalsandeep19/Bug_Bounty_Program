import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateHackerProfile } from '../Services/hackerApi.js'
import Button from '../Common/Button/CTAButton'
import Loader from '../Common/Loader.jsx'

const HackerSettings = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const token = useSelector((state) => state.auth.token)

  const [personalInfo, setPersonalInfo] = useState({
    phone: '',
    bio: '',
    website: '',
    companyname: '',
    linkedin: '',
    instagram: '',
    github: '',
    twitter: '',
  })

  useEffect(() => {
    if (user) {
      setPersonalInfo({
        phone: user?.phone || '',
        bio: user?.basicDetails?.bio || '',
        website: user?.basicDetails?.website || '',
        companyname: user?.basicDetails?.companyname || '',
        linkedin: user?.socialLinks?.linkedin || '',
        instagram: user?.socialLinks?.instagram || '',
        github: user?.socialLinks?.github || '',
        twitter: user?.socialLinks?.twitter || '',
      })
    }
  }, [user])

  const handleChange = (e) => {
    const { name, value } = e.target
    setPersonalInfo((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    const {
      phone,
      bio,
      website,
      companyname,
      linkedin,
      instagram,
      github,
      twitter,
    } = personalInfo

    dispatch(
      updateHackerProfile(
        phone,
        bio,
        website,
        companyname,
        linkedin,
        instagram,
        github,
        twitter
      )
    )
  }

  if (!user) {
    return <Loader />
  }

  return (
    <div className="w-full max-w-5xl mx-auto bg-[#202128] text-white p-10 rounded-xl shadow-xl">
      <h2 className="text-3xl font-semibold mb-1">Profile Information</h2>
      <p className="text-gray-400 mb-8">
        Update your personal information and preferences
      </p>

      {/* User Info Section */}
      <div className="mb-10">
        <div className="flex items-center gap-6 mb-6">
          <img
            src={user?.image}
            alt="User"
            className="w-24 h-24 rounded-full object-cover border-4 border-blue-500"
          />
          <div className="space-y-1">
            <p>
              <span className="font-semibold text-white">Name:</span>{' '}
              <span className="text-gray-300">{user?.name || 'N/A'}</span>
            </p>
            <p>
              <span className="font-semibold text-white">Username:</span>{' '}
              <span className="text-blue-400">{user?.username || 'N/A'}</span>
            </p>
            <p>
              <span className="font-semibold text-white">Email:</span>{' '}
              <span className="text-gray-300">{user?.email || 'N/A'}</span>
            </p>
            <p>
              <span className="font-semibold text-white">Country:</span>{' '}
              <span className="text-gray-300">{user?.country || 'N/A'}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Editable Fields */}
      <form className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {Object.keys(personalInfo).map((key) => (
          <div key={key} className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-300 capitalize">
              {key}
            </label>
            <input
              type="text"
              name={key}
              value={personalInfo[key]}
              onChange={handleChange}
              placeholder={`Enter ${key}`}
              className="w-full px-4 py-3 bg-[#111217] text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}
      </form>

      {/* Submit Button */}
      <div className="flex justify-start mt-10">
        <Button
          onClick={handleSave}
          text="Update Profile"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg transition"
        />
      </div>
    </div>
  )
}

export default HackerSettings
