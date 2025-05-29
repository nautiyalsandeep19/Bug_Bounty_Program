import express from 'express'
import {
  createInitialProgram,
  fetchAllPrograms,
  fetchPrivateProgramsForHacker,
  //   updateProgram,
} from '../Controller/programController.js'
import { authMid } from '../Middleware/authMid.js'

import multer from 'multer'
const upload = multer()
import {
  createProgram,
  updateProgramById,
  getProgramssByCompany,
} from '../Controller/programController.js'

const router = express.Router()

router.post('/create-initial', createInitialProgram)

// router.put('/update/:id', updateProgram)

router.get('/allPrograms', fetchAllPrograms)
router.get('/privatePrograms', authMid, fetchPrivateProgramsForHacker)

//company routes

router.post('/', createProgram)
router.put('/update/:id', upload.none(), updateProgramById)
router.get('/companyProgramss/:companyId', getProgramssByCompany)

export default router
