import express from 'express'
import {
  getAllCompany,
  getCompanyDetails,
  getCompnayPrograms,
  updateContactPerson,
} from '../Controller/company.js'
import { authMid } from '../Middleware/authMid.js'
const router = express.Router()

// router.get('/companyPrograms', authMid, getCompnayPrograms)

router.get('/companyDetails', authMid, getCompanyDetails)
router.put('/updateDetails', authMid, updateContactPerson)
router.get('/companiesData', authMid, getAllCompany)

export default router
