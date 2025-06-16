import express from 'express'
import {
  createReport,
  getAllReports,
  updateStatus,
  getReportById,
  getReportsByHackerId,
  updateSeverity,
  //   getReportsByProgramId,
} from '../Controller/reportController.js'
import { authMid, isCompany } from '../Middleware/authMid.js'
const router = express.Router()

router.get('/:reportId', authMid, getReportById)
router.post('/createReport', authMid, createReport)
router.put('/updateStatus/:reportId', authMid, updateStatus)
router.put('/updateSeverity/:reportId', authMid, updateSeverity)
router.get('/allReports', authMid, getAllReports)
router.get('/reportByHackerId', authMid, getReportsByHackerId)
// router.post('/reportByProgramId', authMid, getReportsByProgramId)


export default router
