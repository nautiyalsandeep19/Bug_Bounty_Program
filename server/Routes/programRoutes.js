import express from 'express';
import multer from 'multer';
import { createProgram } from '../Controller/programController.js';

const router = express.Router();

// Setup file upload
const upload = multer({ dest: 'uploads/' });

// Create a program
router.post('/add', upload.fields([{ name: 'logo', maxCount: 1 }]), createProgram);

export default router;
