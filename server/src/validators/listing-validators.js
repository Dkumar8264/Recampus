import { body, query } from 'express-validator';
import { campusLocations, listingCategories, listingTypes } from '../models/listing-model.js';

export const createListingValidator = [
  body('type').isIn(listingTypes).withMessage('Choose lost, found, or sale.'),
  body('title').trim().isLength({ min: 3, max: 120 }).withMessage('Title must be 3-120 characters.'),
  body('description')
    .trim()
    .isLength({ min: 10, max: 1200 })
    .withMessage('Description must be 10-1200 characters.'),
  body('category').isIn(listingCategories).withMessage('Choose a valid category.'),
  body('location').isIn(campusLocations).withMessage('Choose a valid campus location.'),
  body('price')
    .if(body('type').equals('sale'))
    .isFloat({ min: 0 })
    .withMessage('Price is required for sale listings.'),
  body('price').if(body('type').not().equals('sale')).optional({ nullable: true }).isFloat({ min: 0 }),
  body('images').optional().isArray({ max: 5 }).withMessage('Add up to 5 image URLs.'),
  body('images.*').optional().isURL().withMessage('Each image must be a valid URL.')
];

export const getListingsValidator = [
  query('type').optional().isIn(listingTypes).withMessage('Choose a valid listing type.'),
  query('category').optional().isIn(listingCategories).withMessage('Choose a valid category.'),
  query('location').optional().isIn(campusLocations).withMessage('Choose a valid campus location.'),
  query('search').optional().trim().isLength({ min: 1, max: 80 }).withMessage('Search is too long.'),
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive number.'),
  query('limit').optional().isInt({ min: 1, max: 24 }).withMessage('Limit must be 1-24.')
];
