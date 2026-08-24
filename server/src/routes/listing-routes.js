import { Router } from 'express';
import { createListing, getListings } from '../controllers/listing-controller.js';
import { requireAuth } from '../middleware/auth-middleware.js';
import { createListingValidator, getListingsValidator } from '../validators/listing-validators.js';

const router = Router();

router.get('/', getListingsValidator, getListings);
router.post('/', requireAuth, createListingValidator, createListing);

export default router;
