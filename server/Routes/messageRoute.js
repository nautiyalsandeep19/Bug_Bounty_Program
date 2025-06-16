// routes/messageRoutes.js
import express from 'express';
import { getLogsForHacker, getMessagesForReport } from '../Controller/messageController.js';
const router = express.Router();

router.get('/logs/:hackerId', getLogsForHacker)
router.get('/:reportId', getMessagesForReport);
export default router;
