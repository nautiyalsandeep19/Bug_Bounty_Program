import express from 'express'
import {
  getAllCompany,
  getCompanyDetails,
  getCompnayPrograms,
  updateCompanyPerson,
} from '../Controller/companyController.js'
import { authMid } from '../Middleware/authMid.js'
const router = express.Router()

// router.get('/companyPrograms', authMid, getCompnayPrograms)

router.get('/companyDetails', authMid, getCompanyDetails)
router.put('/updateDetails', authMid, updateCompanyPerson)
router.get('/companiesData', authMid, getAllCompany)

export default router
