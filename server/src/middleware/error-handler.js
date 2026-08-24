import { env } from '../config/env.js';
import { logger } from '../utils/logger.js';

export const errorHandler = (error, req, res, _next) => {
  const statusCode = error.statusCode ?? 500;

  logger.error(error.message ?? 'Unhandled error', {
    method: req.method,
    path: req.originalUrl,
    statusCode,
    stack: env.nodeEnv === 'production' ? undefined : error.stack
  });

  res.status(statusCode).json({
    message: error.message ?? 'Something went wrong.',
    code: error.code,
    details: error.details,
    stack: env.nodeEnv === 'production' ? undefined : error.stack
  });
};
