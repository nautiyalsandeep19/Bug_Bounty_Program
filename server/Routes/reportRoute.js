import express from 'express';
import { createReport, updateStatus } from '../Controller/reportController.js'
import { authMid, isCompany } from '../Middleware/authMid.js';
const router = express.Router();

router.post('/createReport', authMid, createReport);
router.post('/updateStatus',authMid, isCompany, updateStatus);

export default router;