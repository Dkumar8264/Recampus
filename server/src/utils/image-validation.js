import { env } from '../config/env.js';
import { ApiError } from './api-error.js';

const bytesPerMb = 1024 * 1024;

export const imageUploadPolicy = {
  maxBytes: env.maxImageSizeMb * bytesPerMb,
  maxSizeMb: env.maxImageSizeMb,
  allowedMimeTypes: env.allowedImageMimeTypes
};

export const validateImageUploadRequest = ({ mimeType, sizeBytes }) => {
  if (!imageUploadPolicy.allowedMimeTypes.includes(mimeType)) {
    throw new ApiError(400, 'Unsupported image type.', {
      allowedMimeTypes: imageUploadPolicy.allowedMimeTypes
    });
  }

  if (Number(sizeBytes) > imageUploadPolicy.maxBytes) {
    throw new ApiError(400, `Image must be ${imageUploadPolicy.maxSizeMb}MB or smaller.`);
  }
};
