import rateLimit from 'express-rate-limit';

// Common handler for rate limit responses
const rateLimitHandler = (req, res) => {
  return res.status(429).json({
    success: false,
    errors: [{ msg: 'Too many requests. Please try again later.' }],
  });
};

export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  handler: rateLimitHandler,
  standardHeaders: true,
  legacyHeaders: false,
});

export const otpLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 3,
  handler: rateLimitHandler,
  standardHeaders: true,
  legacyHeaders: false,
});
