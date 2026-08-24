import { Router } from 'express';
import {
  getCurrentUser,
  login,
  resendVerification,
  signup,
  verifyEmail
} from '../controllers/auth-controller.js';
import { requireAuth } from '../middleware/auth-middleware.js';
import {
  loginValidator,
  resendVerificationValidator,
  signupValidator,
  verifyEmailValidator
} from '../validators/auth-validators.js';

const router = Router();

router.post('/signup', signupValidator, signup);
router.post('/login', loginValidator, login);
router.post('/verify-email', verifyEmailValidator, verifyEmail);
router.post('/resend-verification', resendVerificationValidator, resendVerification);
router.get('/me', requireAuth, getCurrentUser);

export default router;
