import { body } from 'express-validator';

export const signupValidator = [
  body('name').trim().isLength({ min: 2, max: 80 }).withMessage('Name must be 2-80 characters.'),
  body('email').trim().isEmail().withMessage('Enter a valid email address.').normalizeEmail(),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters.'),
  body('branch').trim().isLength({ min: 2, max: 80 }).withMessage('Branch is required.'),
  body('year').isInt({ min: 1, max: 8 }).withMessage('Year must be between 1 and 8.'),
  body('profilePicture').optional({ checkFalsy: true }).isURL().withMessage('Profile picture must be a URL.')
];

export const loginValidator = [
  body('email').trim().isEmail().withMessage('Enter a valid email address.').normalizeEmail(),
  body('password').notEmpty().withMessage('Password is required.')
];

export const verifyEmailValidator = [
  body('email').trim().isEmail().withMessage('Enter a valid email address.').normalizeEmail(),
  body('otp').trim().isLength({ min: 6, max: 6 }).isNumeric().withMessage('Enter the 6-digit code.')
];

export const resendVerificationValidator = [
  body('email').trim().isEmail().withMessage('Enter a valid email address.').normalizeEmail()
];

export const refreshTokenValidator = [
  body('refreshToken').isString().notEmpty().withMessage('Refresh token is required.')
];

export const googleLoginValidator = [
  body('credential').isString().notEmpty().withMessage('Google credential is required.')
];
