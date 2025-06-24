import { useState, useRef, useEffect } from 'react'
import CTAButton from '../Common/Button/CTAButton'
import { updateCompanyProfile } from '../Services/companyApi'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../Common/Loader'
import { uploadFiles } from '../Services/uploaderApi'

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
    }
  }, [user])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePictureUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      const imageUrl = await uploadFiles(file)
      setFormData((prev) => ({ ...prev, image: imageUrl }))
    } catch (err) {
      console.error('Image upload failed', err)
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
  <div className="min-h-screen py-8 px-4 flex items-center justify-center">
  <form
    onSubmit={handleSubmit}
    className="max-w-5xl w-full p-6 rounded-xl shadow-md grid grid-cols-1 md:grid-cols-2 gap-6 overflow-y-auto"
  >
    {/* Profile Picture at Top */}
    <div className="md:col-span-2 flex flex-col items-center justify-start">
      <label className="text-sm mb-2 font-medium text-white">
        Profile Picture
      </label>
      <div className="w-32 h-32 bg-[#ddd] overflow-hidden mb-4 rounded-full">
        {formData.image ? (
          <img
            src={formData.image}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-900 text-4xl text-white flex justify-center items-center rounded-full">
            {user?.name?.charAt(0)?.toUpperCase() || 'S'}
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

    {/* Left Column */}
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Company Profile</h2>

      <div>
        <label className="block text-sm mb-1">Company username</label>
        <input
          name="username"
          value={user?.username || ''}
          readOnly
          className="w-full h-10 bg-[#1a1a1a] border border-[#333] p-2 rounded text-gray-400 cursor-not-allowed"
        />
      </div>

      <div>
        <label className="block text-sm mb-1">Company email</label>
        <input
          name="email"
          value={user?.email || ''}
          readOnly
          className="w-full h-10 bg-[#1a1a1a] border border-[#333] p-2 rounded text-gray-400 cursor-not-allowed"
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
          className="w-full h-10 bg-[#1a1a1a] border border-[#333] p-2 rounded text-gray-400 cursor-not-allowed"
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
          required
          className="w-full h-10 bg-[#1a1a1a] border border-[#333] p-2 rounded"
        />
      </div>
    </div>

    {/* Right Column */}
    <div className="space-y-4 md:mt-12">
      <div>
        <label className="block text-sm mb-1 font-bold text-white">
          * Position
        </label>
        <input
          name="position"
          value={formData.position}
          onChange={handleChange}
          required
          className="w-full h-10 bg-[#1a1a1a] border border-[#333] p-2 rounded"
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
          required
          className="w-full h-10 bg-[#1a1a1a] border border-[#333] p-2 rounded"
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
          required
          className="w-full h-10 bg-[#1a1a1a] border border-[#333] p-2 rounded"
        />
      </div>

      <div>
        <label className="block text-sm mb-1">Country of origin</label>
        <input
          name="country"
          value={user?.country || ''}
          readOnly
          className="w-full h-10 bg-[#1a1a1a] border border-[#333] p-2 rounded text-gray-400 cursor-not-allowed"
        />
      </div>

      {/* Submit button - visible on all screens */}
      <div className="pt-4 md:pt-6">
        <CTAButton text="Submit" type="submit" className="w-full" />
      </div>
    </div>
  </form>
</div>
  )
}

export default CompanySetting
