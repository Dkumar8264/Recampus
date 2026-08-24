import { matchedData, validationResult } from 'express-validator';
import { Listing } from '../models/listing-model.js';
import { ApiError } from '../utils/api-error.js';

const assertValidRequest = (req) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new ApiError(400, 'Validation failed', errors.array());
  }
};

const listingPopulate = {
  path: 'postedBy',
  select: 'name email branch year profilePicture'
};

export const createListing = async (req, res, next) => {
  try {
    assertValidRequest(req);

    const payload = matchedData(req, { locations: ['body'] });
    const listing = await Listing.create({
      ...payload,
      images: payload.images ?? [],
      postedBy: req.user._id
    });

    await listing.populate(listingPopulate);

    res.status(201).json({ listing });
  } catch (error) {
    next(error);
  }
};

export const getListings = async (req, res, next) => {
  try {
    assertValidRequest(req);

    const { type, category, location, search, page = 1, limit = 12 } = matchedData(req, {
      locations: ['query']
    });
    const currentPage = Number(page);
    const pageSize = Math.min(Number(limit), 24);
    const filters = { status: 'active' };

    if (type) filters.type = type;
    if (category) filters.category = category;
    if (location) filters.location = location;
    if (search) filters.$text = { $search: search };

    const [listings, total] = await Promise.all([
      Listing.find(filters)
        .populate(listingPopulate)
        .sort(search ? { score: { $meta: 'textScore' }, createdAt: -1 } : { createdAt: -1 })
        .skip((currentPage - 1) * pageSize)
        .limit(pageSize),
      Listing.countDocuments(filters)
    ]);

    res.json({
      listings,
      pagination: {
        page: currentPage,
        limit: pageSize,
        total,
        pages: Math.ceil(total / pageSize)
      }
    });
  } catch (error) {
    next(error);
  }
};
