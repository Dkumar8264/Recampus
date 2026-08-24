import { Router } from 'express';
import { getCurrentUser, login, signup } from '../controllers/auth-controller.js';
import { requireAuth } from '../middleware/auth-middleware.js';
import { loginValidator, signupValidator } from '../validators/auth-validators.js';

const router = Router();

router.post('/signup', signupValidator, signup);
router.post('/login', loginValidator, login);
router.get('/me', requireAuth, getCurrentUser);

export default router;
