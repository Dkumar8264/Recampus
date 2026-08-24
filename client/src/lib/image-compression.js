import imageCompression from 'browser-image-compression';

export const defaultImageCompressionOptions = {
  maxSizeMB: 1,
  maxWidthOrHeight: 1600,
  useWebWorker: true,
  fileType: 'image/webp',
  initialQuality: 0.82
};

export const compressListingImage = (file, options = {}) =>
  imageCompression(file, { ...defaultImageCompressionOptions, ...options });
