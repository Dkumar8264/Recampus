import { body } from 'express-validator';

export const validateImageUploadValidator = [
  body('mimeType').isString().trim().notEmpty().withMessage('Image MIME type is required.'),
  body('sizeBytes').isInt({ min: 1 }).withMessage('Image size must be a positive byte count.')
];
