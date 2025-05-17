import { v2 as cloudinary } from 'cloudinary'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import multer from 'multer'
import dotenv from 'dotenv'

dotenv.config()

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
})

// Multer storage using Cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    return {
      folder: 'LaunchProgram',
      resource_type: 'auto', // Supports image, video, raw (zip, pdf, etc.)
      public_id: file.originalname.split('.')[0],
    }
  },
})

// Multer upload middleware
const upload = multer({ storage })

export { cloudinary, upload }
