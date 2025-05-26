// Middleware to authenticate user based on JWT token
import Jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const authMid = async (req, res, next) => {
  try {
    // Extract token from headers, cookies, or body
    const authHeader = req.header('Authorization');
    const token =
      req.cookies?.token ||
      req.body?.token ||
      (authHeader && authHeader.startsWith('Bearer ')
        ? authHeader.split(' ')[1]
        : null);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Token is missing. User not logged in.',
      });
    }

    try {
      const decoded = Jwt.verify(token, process.env.JWT_SECRET);

      // Attach user info to request object
      req.user = decoded;

      next(); // Proceed to next middleware/route
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: 'Token is invalid or expired.',
      });
    }
  } catch (err) {
    console.error('Auth middleware error:', err);
    return res.status(500).json({
      success: false,
      message: 'Internal server error during token validation.',
    });
  }
};


export const isCompany = (req, res, next) => {
  if (req.user && req.user.role === 'company') {
    next(); // User is a company, proceed to next middleware/route
  } else {
    return res.status(403).json({
      success: false,
      message: 'Access denied. Not authorized as a company.',
    });
  }
};