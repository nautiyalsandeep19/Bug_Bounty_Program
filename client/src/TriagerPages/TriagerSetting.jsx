import { useState, useRef, useEffect } from 'react'
import CTAButton from '../Common/Button/CTAButton'
import { updateTriagerProfile } from '../Services/triagerApi'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../Common/Loader'
import { uploadFiles } from '../Services/uploaderApi'

const TriagerSetting = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bio: '',
    github: '',
    image: '',
    phone: '',
  })

  const profilePictureInputRef = useRef(null)

  useEffect(() => {
    if (user) {
      setFormData({
        name: user?.name || '',
        email: user?.email || '',
        bio: user?.bio || '',
        github: user?.github || '',
        image: user?.image || '',
        phone: user?.phone || '',
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
    const { bio, github, image, phone } = formData
    dispatch(updateTriagerProfile(bio, github, phone, image))
  }

  if (!user) return <Loader />

  return (
    <div className="h-full p-8 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="max-w-4xl w-full p-8 rounded-xl shadow-md grid grid-cols-1 md:grid-cols-3 gap-8 max-h-[90vh]"
      >
        {/* Left Side Form */}
        <div className="md:col-span-2 space-y-4">
          <h2 className="text-2xl font-bold">Triager Profile</h2>

          <div>
            <label className="block text-sm mb-1 text-white">Username</label>
            <input
              name="name"
              value={formData.name}
              readOnly
              className="w-full bg-[#1a1a1a] border border-[#333] p-2 rounded text-gray-400 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-white">Email</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              readOnly
              className="w-full bg-[#1a1a1a] border border-[#333] p-2 rounded text-gray-400 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-white">Phone</label>
            <input
              name="phone"
              type="text"
              value={formData.phone}
              onChange={handleChange}
              className="w-full bg-[#1a1a1a] border border-[#333] p-2 rounded text-white"
              maxLength={10}
              pattern="\d*"
            />
          </div>

          <div>
            <label className="block text-sm mb-1 font-bold text-white">
              Bio
            </label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows={3}
              className="w-full bg-[#1a1a1a] border border-[#333] p-2 rounded resize-none"
            />
          </div>

          <div>
            <label className="block text-sm mb-1 font-bold text-white">
              GitHub
            </label>
            <input
              name="github"
              value={formData.github}
              onChange={handleChange}
              placeholder="https://github.com/username"
              className="w-full bg-[#1a1a1a] border border-[#333] p-2 rounded"
            />
          </div>

          <CTAButton text="Update Profile" type="submit" />
        </div>

        {/* Right Side: Profile Picture */}
        <div className="flex flex-col items-center justify-start">
          <label className="text-sm mb-2 font-medium text-white">
            Profile Picture
          </label>
          <div className="w-40 h-40 bg-[#ddd] overflow-hidden mb-4 rounded-full">
            {formData.image ? (
              <img
                src={formData.image}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-900 text-4xl text-white flex justify-center items-center rounded-full">
                {formData.name?.charAt(0)?.toUpperCase() || 'T'}
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

export default TriagerSetting
