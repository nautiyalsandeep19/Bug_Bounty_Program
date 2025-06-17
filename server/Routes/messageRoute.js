// routes/messageRoutes.js
import express from 'express';
import { getLogsForHacker, getMessagesForReport, updateMessage } from '../Controller/messageController.js';
const router = express.Router();

router.get('/logs/:hackerId', getLogsForHacker)
router.get('/:reportId', getMessagesForReport);
router.put('/update',updateMessage)
export default router;
