// routes/messageRoutes.js
import express from 'express';
import { getMessagesForReport } from '../Controller/messageController.js';
const router = express.Router();

router.get('/:reportId', getMessagesForReport);

export default router;
