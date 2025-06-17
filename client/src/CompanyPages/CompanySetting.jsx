import React, { useState, useRef, useEffect } from 'react'
import CTAButton from '../Common/Button/CTAButton'
import { updateCompanyProfile } from '../Services/companyApi'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../Common/Loader'

const CompanySetting = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  const [formData, setFormData] = useState({
    representative: '',
    phone: '',
    domain: '',
    position: '',
    image: '',
  })

  const [profilePicture, setProfilePicture] = useState('')
  const profilePictureInputRef = useRef(null)

  useEffect(() => {
    if (user) {
      setFormData({
        representative: user?.contactPerson?.representative || '',
        phone: user?.contactPerson?.phone || '',
        domain: user?.domain || '',
        position: user?.contactPerson?.position || '',
        image: user?.image || '',
      })
      setProfilePicture(user?.image || '')
    }
  }, [user])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePictureUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfilePicture(reader.result)
        setFormData((prev) => ({ ...prev, image: reader.result }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const { representative, phone, domain, position, image } = formData
    dispatch(
      updateCompanyProfile(representative, phone, domain, position, image)
    )
  }

  if (!user) return <Loader />

  return (
    <div className="h-full  p-8 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="max-w-5xl w-full p-8 rounded-xl shadow-md grid grid-cols-1 md:grid-cols-3 gap-8 max-h-[90vh]"
      >
        {/* Form Fields */}
        <div className="md:col-span-2 space-y-4">
          <h2 className="text-2xl font-bold">Company Profile</h2>

          <div>
            <label className="block text-sm mb-1">Company username</label>
            <input
              name="username"
              value={user?.username || ''}
              readOnly
              className="w-full bg-[#1a1a1a] border border-[#333] p-2 rounded text-gray-400 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Company email</label>
            <input
              name="email"
              value={user?.email || ''}
              readOnly
              className="w-full bg-[#1a1a1a] border border-[#333] p-2 rounded text-gray-400 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-sm mb-1 font-bold text-white">
              * Company name
            </label>
            <input
              name="companyName"
              value={user?.name || ''}
              readOnly
              className="w-full bg-[#1a1a1a] border border-[#333] p-2 rounded text-gray-400 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-sm mb-1 font-bold text-white">
              * Representative name
            </label>
            <input
              name="representative"
              value={formData.representative}
              onChange={handleChange}
              className="w-full bg-[#1a1a1a] border border-[#333] p-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-1 font-bold text-white">
              * Position
            </label>
            <input
              name="position"
              value={formData.position}
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
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full bg-[#1a1a1a] border border-[#333] p-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1 font-bold text-white">
              * Website (domain)
            </label>
            <input
              name="domain"
              value={formData.domain}
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
              value={user?.country || ''}
              readOnly
              className="w-full bg-[#1a1a1a] border border-[#333] p-2 rounded text-gray-400 cursor-not-allowed"
            />
          </div>

          <CTAButton text="Submit" onClick={handleSubmit} />
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
