import express from 'express';
import { createReport, getAllReports, updateStatus ,getReportById } from '../Controller/reportController.js'
import { authMid, isCompany } from '../Middleware/authMid.js';
const router = express.Router();

router.post('/createReport', authMid, createReport);
router.put('/updateStatus/:reportId',authMid, updateStatus);
router.get('/allReports', authMid, getAllReports)
router.get('/:id',authMid, getReportById)

export default router;