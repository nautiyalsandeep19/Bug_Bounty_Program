import Admin from '../Models/admin.js'
import express from 'express'
import { updateTriager } from '../Controller/triagerController.js'

const router = express.Router()

router.put('/updateTriagerDetails', updateTriager)

export default router
