import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateHackerProfile } from '../Services/hackerApi.js'
import Button from '../Common/Button/CTAButton'

const HackerSettings = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

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
    return (
      <div className="text-white text-center p-4">
        Loading user information...
      </div>
    )
  }

  return (
    <div className="w-full bg-[#111f3a] text-white p-8 rounded-lg shadow-lg flex flex-col gap-8 overflow-y-scroll">
      <h2 className="text-3xl font-semibold mb-6">Settings</h2>

      <div className="flex flex-col gap-8">
        {/* User Information Section */}
        <div className="p-6 bg-gradient-to-r from-[#1E293B] via-[#334155] to-[#1E293B] rounded-xl shadow-xl transition-all duration-300 hover:shadow-2xl">
          <h3 className="text-2xl font-semibold text-white mb-6">
            User Information
          </h3>
          <div className="flex flex-col gap-4 text-base text-gray-300 ">
            <div className="flex items-center gap-4">
              <img
                src={user?.image}
                alt="User"
                className="w-24 h-24 rounded-full object-cover border-4 border-[#0066ff]"
              />
              <div>
                <div className="flex items-center">
                  <strong className="text-white mr-2">Name:</strong>
                  <span className="text-gray-200">{user?.name || 'N/A'}</span>
                </div>
                <div className="flex items-center">
                  <strong className="text-white mr-2">Username:</strong>
                  <span className="text-blue-500">
                    {user?.username || 'N/A'}
                  </span>
                </div>
                <div className="flex items-center">
                  <strong className="text-white mr-2">Email:</strong>
                  <span className="text-gray-200">{user?.email || 'N/A'}</span>
                </div>
                <div className="flex items-center">
                  <strong className="text-white mr-2">Country:</strong>
                  <span className="text-gray-200">
                    {user?.country || 'N/A'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Details Section */}
        <div className="p-6 bg-gradient-to-r from-[#1E293B] via-[#334155] to-[#1E293B] rounded-xl shadow-xl transition-all duration-300 hover:shadow-2xl">
          <h3 className="text-2xl font-semibold text-white mb-6">
            Edit Details
          </h3>
          <div className="space-y-6">
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
                  className="w-full p-4 bg-[#0F172A] text-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all duration-200 ease-in-out focus:outline-none"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-8">
        <Button
          onClick={handleSave}
          text="Update Profile"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-all"
        />
      </div>
    </div>
  )
}

export default HackerSettings
