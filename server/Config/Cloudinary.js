// config/cloudinary.js
import { v2 as cloudinary } from 'cloudinary'
import dotenv from 'dotenv'

dotenv.config()

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
})

import multer from 'multer'
import fs from 'fs'
import path from 'path'

// Ensure 'temp' folder exists
const tempDir = path.join(process.cwd(), 'temp')
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir)
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir)
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
})

const upload = multer({ storage })

export { cloudinary, upload };

// import { v2 as cloudinary } from 'cloudinary';
// import { CloudinaryStorage } from 'multer-storage-cloudinary';
// import multer from 'multer';
// import dotenv from 'dotenv';

// dotenv.config();

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_NAME,
//   api_key: process.env.CLOUDINARY_KEY,
//   api_secret: process.env.CLOUDINARY_SECRET,
// });

// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: async (req, file) => {
//     let resourceType = 'auto';
//     const mimetype = file.mimetype;

//     if (
//       mimetype === 'application/pdf' ||
//       mimetype === 'application/zip' ||
//       mimetype === 'application/msword' ||
//       mimetype.startsWith('application/')
//     ) {
//       resourceType = 'raw';
//     }

//     return {
//       folder: 'LaunchProgram',
//       resource_type: resourceType,
//       public_id: file.originalname,
//       type: 'upload', // ✅ Make the file public and accessible
//     };
//   },
// });

// const upload = multer({ storage });

// export { cloudinary, upload };


// // // Config/Cloudinary.js
// // import { v2 as cloudinary } from 'cloudinary'
// // import { CloudinaryStorage } from 'multer-storage-cloudinary'
// // import multer from 'multer'
// // import dotenv from 'dotenv'

// // dotenv.config()

// // cloudinary.config({
// //   cloud_name: process.env.CLOUDINARY_NAME,
// //   api_key: process.env.CLOUDINARY_KEY,
// //   api_secret: process.env.CLOUDINARY_SECRET,
// // })

// // // Dynamic resource type based on mimetype
// // const storage = new CloudinaryStorage({
// //   cloudinary,
// //   params: async (req, file) => {
// //     let resourceType = 'auto'
// //     const mimetype = file.mimetype

// //     // Force 'raw' for non-images (PDF, ZIP, DOCX, etc.)
// //     if (
// //       mimetype === 'application/pdf' ||
// //       mimetype === 'application/zip' ||
// //       mimetype === 'application/msword' ||
// //       mimetype.startsWith('application/')
// //     ) {
// //       resourceType = 'raw'
// //     }

// //     return {
// //       folder: 'LaunchProgram',
// //       resource_type: resourceType,
// //       public_id: file.originalname.split('.')[0],
// //     };
// //   },
// // });

// // const upload = multer({ storage })

// // export { cloudinary, upload };
