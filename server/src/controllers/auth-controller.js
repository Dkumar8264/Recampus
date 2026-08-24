import { validationResult } from 'express-validator';
import { env } from '../config/env.js';
import { User } from '../models/user-model.js';
import { ApiError } from '../utils/api-error.js';
import { sanitizeUser } from '../utils/sanitize-user.js';
import { signAccessToken, signRefreshToken } from '../utils/tokens.js';

const assertValidRequest = (req) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new ApiError(400, 'Validation failed', errors.array());
  }
};

const buildAuthResponse = (user) => ({
  user: sanitizeUser(user),
  accessToken: signAccessToken(user._id.toString()),
  refreshToken: signRefreshToken(user._id.toString())
});

export const signup = async (req, res, next) => {
  try {
    assertValidRequest(req);

    const { name, email, password, branch, year, profilePicture } = req.body;
    const normalizedEmail = email.toLowerCase();

    if (!normalizedEmail.endsWith(`@${env.allowedEmailDomain}`)) {
      throw new ApiError(400, `Please use your @${env.allowedEmailDomain} college email.`);
    }

    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      throw new ApiError(409, 'An account with this email already exists.');
    }

    const user = await User.create({
      name,
      email: normalizedEmail,
      password,
      branch,
      year,
      profilePicture
    });

    res.status(201).json(buildAuthResponse(user));
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    assertValidRequest(req);

    const { email, password } = req.body;
    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');

    if (!user || !(await user.comparePassword(password))) {
      throw new ApiError(401, 'Invalid email or password.');
    }

    res.json(buildAuthResponse(user));
  } catch (error) {
    next(error);
  }
};

export const getCurrentUser = async (req, res) => {
  res.json({ user: sanitizeUser(req.user) });
};
