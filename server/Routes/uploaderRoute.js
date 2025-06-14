import express from 'express';
import fs from 'fs';
import path from 'path';
import { cloudinary, upload } from '../Config/Cloudinary.js';

const router = express.Router();

router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    const localFilePath = req.file.path;
    const mime = req.file.mimetype;
    const ext = path.extname(req.file.originalname);
    const baseName = path.basename(req.file.originalname, ext);

    // Determine correct Cloudinary resource type
    let resourceType = 'auto';
    if (mime.startsWith('application/')) {
      resourceType = 'raw';
    } else if (mime.startsWith('video/')) {
      resourceType = 'video';
    } else if (mime.startsWith('image/')) {
      resourceType = 'image';
    }

    // Upload to Cloudinary with appropriate settings
    const result = await cloudinary.uploader.upload(localFilePath, {
      resource_type: resourceType,
      folder: 'LaunchProgram',
      public_id: baseName,           // no extension; Cloudinary adds it
      use_filename: true,
      unique_filename: false,
      type: 'upload',
    });

    // Delete local file after uploading
    fs.unlinkSync(localFilePath);

    console.log("Upload Result: " ,result)

    // ✅ Construct reliable URL manually
    // const url = `https://res.cloudinary.com/${process.env.CLOUDINARY_NAME}/${resourceType}/upload/${result.public_id}${ext}`;

    res.status(200).json({
      success: true,
      file: {
        url: result.secure_url,
        filename: `${baseName}`,
        mimetype: mime,
        resource_type: result.resource_type,
      },
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ success: false, error: 'Upload failed' });
  }
});

export default router;
