import { Router } from 'express';
import {
  createListing,
  getListingById,
  getListings,
  getMyListings
} from '../controllers/listing-controller.js';
import { requireAuth } from '../middleware/auth-middleware.js';
import { createListingValidator, getListingsValidator } from '../validators/listing-validators.js';

const router = Router();

router.get('/', getListingsValidator, getListings);
router.post('/', requireAuth, createListingValidator, createListing);
router.get('/mine', requireAuth, getMyListings);
router.get('/:id', getListingById);

export default router;
