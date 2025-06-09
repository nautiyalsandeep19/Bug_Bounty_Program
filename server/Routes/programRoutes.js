
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
  updateProgramVisibility
} from '../Controller/programController.js'

const router = express.Router()

router.post("/",createProgram);
router.put("/update/:id", upload.none(), updateProgramById);
router.get("/companyPrograms/:companyId", getProgramsByCompany);
router.get("/Programs/:programId", getProgramByIds); // For testing purposes
router.patch("/:id/visibility", updateProgramVisibility);

// for hackers
router.get('/allPrograms', fetchAllPrograms)
router.get('/privatePrograms', fetchPrivateProgramsForHacker)

export default router
