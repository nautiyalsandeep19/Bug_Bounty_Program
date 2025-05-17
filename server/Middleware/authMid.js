// import Jwt from 'jsonwebtoken'
// import dotenv from 'dotenv'

// dotenv.config()

// //auth middleware for logged in users

// export const authMid = async (req, res, next) => {
//   console.log('auth middleware working')

//   try {
//     //extracts the token
//     const token =
//       req.cookies.token ||
//       req.body.token ||
//       req.header('Authorization').replace('Bearer ', '')

//     //if token missed then return response

//     if (!token) {
//       return res.status(409).json({
//         success: false,
//         message: 'Token is missing User not logged in',
//       })
//     }

//     try {
//       const decode = Jwt.verify(token, process.env.JWT_SECRET)
//       console.log('decoded token', decode)
//       // if (decode.userType === 'hacker') {
//       //   req.hacker = decode
//       // } else if (decode.userType === 'company') {
//       //   req.company = decode
//       // }

//       req.user = decode
//     } catch (error) {
//       console.log(error)

//       return res.status(401).json({
//         success: false,
//         message: 'Token is invalid ',
//       })
//     }
//     next()
//   } catch (error) {
//     console.log(error)

//     return res.status(500).json({
//       success: false,
//       message: 'Something went wrong while vaildating toke ',
//     })
//   }
// }


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


