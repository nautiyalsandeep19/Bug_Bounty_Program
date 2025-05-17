import express from 'express'
import { upload } from '../Config/Cloudinary.js'
import { uploadFile } from '../Utils/uploadCloudinary.js'

const router = express.Router()

router.post('/upload', upload.single('file'), uploadFile)

export default router
