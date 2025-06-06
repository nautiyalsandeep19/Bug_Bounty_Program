// Config/Cloudinary.js
import { v2 as cloudinary } from 'cloudinary'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import multer from 'multer'
import dotenv from 'dotenv'

dotenv.config()

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
})

// Dynamic resource type based on mimetype
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    let resourceType = 'auto';
    const mimetype = file.mimetype;

    // Force 'raw' for non-images (PDF, ZIP, DOCX, etc.)
    if (
      mimetype === 'application/pdf' ||
      mimetype === 'application/zip' ||
      mimetype === 'application/msword' ||
      mimetype.startsWith('application/')
    ) {
      resourceType = 'raw';
    }

    return {
      folder: 'LaunchProgram',
      resource_type: resourceType,
      public_id: file.originalname.split('.')[0],
    };
  },
});

const upload = multer({ storage });

export { cloudinary, upload };
