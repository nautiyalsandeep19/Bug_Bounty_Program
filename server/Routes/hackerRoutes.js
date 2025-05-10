import express from 'express'

import {
  getHackerDetails,
  getLeaderboard,
  updateHackerPerson,
} from '../Controller/hackerController.js'
import { authMid } from '../Middleware/authMid.js'
const router = express.Router()
// get hacker details
router.get('/hackerDetails', authMid, getHackerDetails)
router.put('/updateHackerDetails', authMid, updateHackerPerson)
router.get('/leaderBoard', getLeaderboard);

export default router
