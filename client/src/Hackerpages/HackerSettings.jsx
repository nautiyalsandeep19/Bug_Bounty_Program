import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateHackerProfile } from '../Services/hackerApi.js'

import Button from '../Components/Button/Button'

const HackerSettings = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  const [edit, setEdit] = useState(false)
  const [personalInfo, setPersonalInfo] = useState({
    phone: '',
    bio: '',
    website: '',
    companywebsite: '',
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
        companywebsite: user?.basicDetails?.companywebsite || '',
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
      companywebsite,
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
        companywebsite,
        linkedin,
        instagram,
        github,
        twitter
      )
    )
    setEdit(false)
  }

  if (!user) {
    return (
      <div className="text-white text-center p-4">
        Loading user information...
      </div>
    )
  }

  const { basicDetails, socialLinks } = user

  return (
    <div className="w-full bg-[#111f3a] text-white p-8 rounded-lg shadow-lg flex flex-col gap-8">
      <h2 className="text-3xl font-semibold mb-6">Account Details</h2>

      <div className="flex flex-col gap-6">
        <div className="p-4 bg-[#1E293B] rounded-lg shadow-lg">
          <h3 className="text-xl font-medium text-white mb-4">
            User Information
          </h3>
          <div className="flex flex-col gap-3 text-sm text-gray-400">
            <img
              src={user?.image}
              alt="User"
              className="w-20 h-20 rounded-full object-cover"
            />
            <div>
              <strong className="text-white">Username:</strong>{' '}
              {user?.name || 'N/A'}
            </div>
            <div>
              <strong className="text-white">Email:</strong>{' '}
              {user?.email || 'N/A'}
            </div>
            <div>
              <strong className="text-white">Country:</strong>{' '}
              {user?.country || 'N/A'}
            </div>
          </div>
        </div>

        {edit ? (
          <div className="p-4 bg-[#1E293B] rounded-lg shadow-lg">
            <h3 className="text-xl font-medium text-white mb-4">
              Edit Details
            </h3>
            {Object.keys(personalInfo).map((key) => (
              <div key={key} className="mb-4">
                <label className="block text-sm mb-2 capitalize text-gray-400">
                  {key}
                </label>
                <input
                  type="text"
                  name={key}
                  value={personalInfo[key]}
                  onChange={handleChange}
                  placeholder={`Enter ${key}`}
                  className="w-full p-3 bg-[#0F172A] text-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="p-4 bg-[#1E293B] rounded-lg shadow-lg">
            <h3 className="text-xl font-medium text-white mb-4">
              Basic Details
            </h3>
            <div className="flex flex-col gap-4 text-sm text-gray-400">
              <div>
                <strong className="text-white">Phone:</strong>{' '}
                {user?.phone || 'N/A'}
              </div>
              <div>
                <strong className="text-white">Bio:</strong>{' '}
                {basicDetails?.bio || 'N/A'}
              </div>
              <div>
                <strong className="text-white">Website:</strong>{' '}
                {basicDetails?.website || 'N/A'}
              </div>
              <div>
                <strong className="text-white">Company Website:</strong>{' '}
                {basicDetails?.companywebsite || 'N/A'}
              </div>
              <div>
                <strong className="text-white">Twitter:</strong>{' '}
                {socialLinks?.twitter || 'N/A'}
              </div>
              <div>
                <strong className="text-white">Instagram:</strong>{' '}
                {socialLinks?.instagram || 'N/A'}
              </div>
              <div>
                <strong className="text-white">LinkedIn:</strong>{' '}
                {socialLinks?.linkedin || 'N/A'}
              </div>
              <div>
                <strong className="text-white">Github:</strong>{' '}
                {socialLinks?.github || 'N/A'}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-center mt-8">
        {edit ? (
          <Button
            onClick={handleSave}
            text="Save"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-all"
          />
        ) : (
          <Button
            onClick={() => setEdit(true)}
            text="Edit"
            className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-lg transition-all"
          />
        )}
      </div>
    </div>
  )
}

export default HackerSettings
