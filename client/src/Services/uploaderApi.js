import { toast } from 'react-hot-toast'
import { apiConnector, endPoints } from './ApiConnector/api'

export const uploadFiles = async (file) => {
  try {
    const formData = new FormData()
    formData.append('file', file) // Send raw file, not FormData again

    const response = await apiConnector('POST', endPoints.UPLOAD, formData, {
      'Content-Type': 'multipart/form-data',
    })

    console.log('Upload Response:', response)

    // ✅ Expect Cloudinary URL from `file.url`
    if (!response?.file?.url) {
      toast.error('Upload failed')
      return null
    }

    return response.file.url
  } catch (error) {
    console.error('Error uploading:', error)
    toast.error('Failed to upload image')
    return null
  }
}
