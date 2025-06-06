import express from 'express'

import {
  getAllHackersDetails,
  getHackerDetails,
  getLeaderboard,
  updateHackerPerson,
} from '../Controller/hackerController.js'
import { authMid } from '../Middleware/authMid.js'
const router = express.Router()
// get hacker details
router.get('/hackerDetails', authMid, getHackerDetails)
router.put('/updateHackerDetails', authMid, updateHackerPerson)
router.get('/leaderBoard', getLeaderboard)
router.get('/hackersdata', getAllHackersDetails)

export default router
