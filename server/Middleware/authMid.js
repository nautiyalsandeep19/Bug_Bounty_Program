import Jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import redisClient from '../Config/redisClient.js'

dotenv.config()

export const authMid = async (req, res, next) => {
  try {
    // Extract token from headers, cookies, or body
    const authHeader = req.header('Authorization')
    const token =
      req.cookies?.token ||
      req.body?.token ||
      (authHeader && authHeader.startsWith('Bearer ')
        ? authHeader.split(' ')[1]
        : null)

    // console.log('from authmid', token)

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Token is missing. User not logged in.',
      })
    }

    // Check if token is blacklisted in Redis
    const isBlacklisted = await redisClient.get(`bl_${token}`)
    if (isBlacklisted) {
      return res.status(401).json({
        success: false,
        message: 'Please login first to access the site',
      })
    }

    try {
      const decoded = Jwt.verify(token, process.env.JWT_SECRET)

      // Attach user info to request object
      req.user = decoded

      next()
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: 'Token is invalid or expired.',
      })
    }
  } catch (err) {
    console.error('Auth middleware error:', err)
    return res.status(500).json({
      success: false,
      message: 'Internal server error during token validation.',
    })
  }
}

export const isCompany = (req, res, next) => {
  if (req.user && req.user.userType === 'company') {
    next()
  } else {
    return res.status(403).json({
      success: false,
      message: 'Access denied. Not authorized as a company.',
    })
  }
}
