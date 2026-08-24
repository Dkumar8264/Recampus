import { env } from '../config/env.js';

export const errorHandler = (error, _req, res, _next) => {
  const statusCode = error.statusCode ?? 500;

  res.status(statusCode).json({
    message: error.message ?? 'Something went wrong.',
    details: error.details,
    stack: env.nodeEnv === 'production' ? undefined : error.stack
  });
};
