import express from "express";
import { getCompnayPrograms } from "../Controller/company.js";
import { authMid } from "../Middleware/authMid.js";
const router = express.Router()

router.get('/companyPrograms',authMid, getCompnayPrograms)

export default router

