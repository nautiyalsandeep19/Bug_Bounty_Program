import { body } from 'express-validator';

export const signUpValidator = [
  body('name').trim().notEmpty().escape(),
  body('email').isEmail().normalizeEmail(),
  body('password')
    .isStrongPassword()
    .withMessage('Password must include 8+ characters, upper, lower, number, and special character.'),
  body('confirmPassword').custom((value, { req }) => {
    if (value !== req.body.password) throw new Error('Passwords do not match');
    return true;
  }),
  body('otp').isLength({ min: 6, max: 6 }).withMessage('Invalid OTP format'),
  body('userType').isIn(['hacker', 'company']),
  body('domain').optional().trim().escape(),
];

export const loginValidator = [
  body('email').isEmail().normalizeEmail(),
  body('password').notEmpty(),
  body('userType').isIn(['hacker', 'company']),
];

export const changePasswordValidator = [
  body('oldPassword').notEmpty(),
  body('newPassword')
    .isStrongPassword()
    .withMessage('Password must be strong'),
  body('newConfirmPassword').custom((value, { req }) => {
    if (value !== req.body.newPassword) throw new Error('Passwords do not match');
    return true;
  }),
];
