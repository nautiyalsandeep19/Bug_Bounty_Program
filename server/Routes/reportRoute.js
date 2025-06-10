import express from 'express'
import {
  createReport,
  getAllReports,
  getReportsById,
  updateStatus,
} from '../Controller/reportController.js'
import { authMid, isCompany } from '../Middleware/authMid.js'
const router = express.Router()

router.post('/createReport', authMid, createReport)
router.put('/updateStatus/:reportId', authMid, updateStatus)
router.get('/allReports', authMid, getAllReports)
router.get('/reportById', authMid, getReportsById)

export default router
