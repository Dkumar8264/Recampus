import { Router } from 'express';
import { getImageUploadPolicy, validateImageUpload } from '../controllers/upload-controller.js';
import { requireAuth } from '../middleware/auth-middleware.js';
import { validateImageUploadValidator } from '../validators/upload-validators.js';

const router = Router();

router.get('/image-policy', getImageUploadPolicy);
router.post('/validate-image', requireAuth, validateImageUploadValidator, validateImageUpload);

export default router;
