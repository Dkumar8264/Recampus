import { User } from '../models/user-model.js';
import { ApiError } from '../utils/api-error.js';
import { verifyAccessToken } from '../utils/tokens.js';

export const requireAuth = async (req, _res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
      throw new ApiError(401, 'Authentication required.');
    }

    const token = authHeader.slice('Bearer '.length);
    const payload = verifyAccessToken(token);
    const user = await User.findById(payload.sub);

    if (!user) {
      throw new ApiError(401, 'Authentication required.');
    }

    req.user = user;
    next();
  } catch (error) {
    next(error.statusCode ? error : new ApiError(401, 'Invalid or expired token.'));
  }
};
