import express from 'express'
import multer from 'multer'
const upload = multer()
import {
  createProgram,
  updateProgramById,
  getProgramsByCompany,
  getProgramByIds,
  fetchAllPrograms,
  fetchPrivateProgramsForHacker,
  updateProgramVisibility,
  toggleLeaderboardVisibility,
  publishProgram,
  avgResponse,
  getProgramAssets,
} from '../Controller/programController.js'
import { authMid } from '../Middleware/authMid.js'

const router = express.Router()

router.post('/', createProgram)
router.put('/update/:id', upload.none(), updateProgramById)
router.get('/companyPrograms/:companyId', getProgramsByCompany)
router.post('/programDetail', getProgramByIds)
router.post('/visibilityChange', toggleLeaderboardVisibility)
router.patch('/:id/visibility', updateProgramVisibility)
router.patch('/:id/publish', publishProgram)
router.get('/avgResponse', avgResponse)
// router.post('/get-assets', getProgramAssets);

// for hackers
router.get('/allPrograms', fetchAllPrograms)
router.get('/privatePrograms', authMid, fetchPrivateProgramsForHacker)

export default router
