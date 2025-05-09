import express from 'express';
import { createInitialProgram, fetchAllPrograms, fetchPrivateProgramsForHacker, updateProgram } from '../Controller/programController.js';
import { authMid } from '../Middleware/authMid.js';

const router = express.Router();


router.post('/create-initial', createInitialProgram);


router.put('/update/:id', updateProgram);

router.get('/allPrograms',fetchAllPrograms);
router.get('/privatePrograms',authMid, fetchPrivateProgramsForHacker);

export default router;