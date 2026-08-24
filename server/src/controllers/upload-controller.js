import { validationResult } from 'express-validator';
import { ApiError } from '../utils/api-error.js';
import { imageUploadPolicy, validateImageUploadRequest } from '../utils/image-validation.js';

const assertValidRequest = (req) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new ApiError(400, 'Validation failed', errors.array());
  }
};

export const getImageUploadPolicy = (_req, res) => {
  res.json({ imageUploadPolicy });
};

export const validateImageUpload = (req, res, next) => {
  try {
    assertValidRequest(req);
    validateImageUploadRequest(req.body);
    res.json({ ok: true, imageUploadPolicy });
  } catch (error) {
    next(error);
  }
};
