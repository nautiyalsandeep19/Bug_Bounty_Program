import express from 'express'
import { getAsset } from '../Controller/assetController.js'
const router = express.Router()
router.post('/create', getAsset)
export default router
