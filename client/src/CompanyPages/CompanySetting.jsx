import React, { useState, useRef } from 'react'
import axios from 'axios'

const CompanySetting = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    companyName: '',
    representativeName: '',
    contactNumber: '',
    website: '',
    country: '',
    timezone: '',
  })

  const [profilePicture, setProfilePicture] = useState(null)
  const profilePictureInputRef = useRef()
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handlePictureUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setProfilePicture(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const form = new FormData()
    Object.entries(formData).forEach(([key, value]) => {
      form.append(key, value)
    })

    if (profilePictureInputRef.current?.files?.[0]) {
      form.append('profilePicture', profilePictureInputRef.current.files[0])
    }

    try {
      const res = await axios.post('http://localhost:8000/api/companies', form)
      alert('Company saved successfully!')
      console.log(res.data)
    } catch (error) {
      console.error(error)
      alert('Error saving company')
    }
  }

  return (
    <div className="h-[90vh] bg-black text-white p-8 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="max-w-5xl w-full bg-[#1111] p-8 rounded-xl shadow-md grid grid-cols-1 md:grid-cols-3 gap-8 max-h-[90vh]"
      >
        {/* Form Fields */}
        <div className="md:col-span-2 space-y-4">
          <h2 className="text-2xl font-bold">Company Profile</h2>

          <div>
            <label className="block text-sm mb-1">Company username</label>
            <input
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full bg-[#1a1a1a] border border-[#333] p-2 rounded"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Company email</label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-[#1a1a1a] border border-[#333] p-2 rounded"
            />
          </div>

          <div>
            <label className="block text-sm mb-1 font-bold text-white">
              * Company name
            </label>
            <input
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              className="w-full bg-[#1a1a1a] border border-[#333] p-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1 font-bold text-white">
              * Representative name
            </label>
            <input
              name="representativeName"
              value={formData.representativeName}
              onChange={handleChange}
              className="w-full bg-[#1a1a1a] border border-[#333] p-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1 font-bold text-white">
              * Contact number
            </label>
            <input
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              className="w-full bg-[#1a1a1a] border border-[#333] p-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1 font-bold text-white">
              * Website
            </label>
            <input
              name="website"
              value={formData.website}
              onChange={handleChange}
              placeholder="Enter website url"
              className="w-full bg-[#1a1a1a] border border-[#333] p-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Country of origin</label>
            <input
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="w-full bg-[#1a1a1a] border border-[#333] p-2 rounded"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Preferred timezone</label>
            <select
              name="timezone"
              value={formData.timezone}
              onChange={handleChange}
              className="w-full bg-[#1a1a1a] border border-[#333] p-2 rounded"
            >
              <option value="">Select your preference</option>
              <option value="IST">UTC+05:30 (India Standard Time)</option>
              <option value="GMT">UTC+00:00 (GMT)</option>
              <option value="CET">UTC+01:00 (CET)</option>
            </select>
          </div>

          <button
            type="submit"
            className="mt-4 bg-gray-600 hover:bg-gray-700 px-6 py-2 rounded shadow w-full md:w-auto"
          >
            Submit
          </button>
        </div>

        {/* Profile Picture Upload */}
        <div className="flex flex-col items-center">
          <label className="text-sm mb-2">Profile Picture</label>
          <div className="w-40 h-40 bg-[#ddd] rounded-lg overflow-hidden mb-4">
            {profilePicture ? (
              <img
                src={profilePicture}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-900 text-4xl flex justify-center items-center">
                S
              </div>
            )}
          </div>
          <label className="bg-[#1a1a1a] border border-[#333] px-4 py-2 rounded cursor-pointer hover:bg-[#222] transition">
            Upload New Picture
            <input
              type="file"
              className="hidden"
              onChange={handlePictureUpload}
              ref={profilePictureInputRef}
            />
          </label>
        </div>
      </form>
    </div>
  )
}

export default CompanySetting
