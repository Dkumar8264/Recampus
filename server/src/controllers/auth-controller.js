import { validationResult } from 'express-validator';
import { env } from '../config/env.js';
import { User } from '../models/user-model.js';
import { sendVerificationEmail } from '../services/email-service.js';
import { ApiError } from '../utils/api-error.js';
import { sanitizeUser } from '../utils/sanitize-user.js';
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../utils/tokens.js';

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

const createAndSendVerificationOtp = async (user) => {
  const otp = User.generateEmailVerificationOtp();
  const expiresAt = new Date(Date.now() + env.verificationOtpExpiresMinutes * 60 * 1000);

  await user.setEmailVerificationOtp(otp, expiresAt);
  await user.save();
  await sendVerificationEmail({
    to: user.email,
    otp,
    expiresMinutes: env.verificationOtpExpiresMinutes
  });
};

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

    await createAndSendVerificationOtp(user);

    res.status(201).json({
      message: 'Account created. Check your college email for the verification code.',
      requiresEmailVerification: true,
      email: user.email
    });
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

    if (!user.emailVerified) {
      throw new ApiError(
        403,
        'Please verify your college email before logging in.',
        { email: user.email },
        'EMAIL_NOT_VERIFIED'
      );
    }

    res.json(buildAuthResponse(user));
  } catch (error) {
    next(error);
  }
};

export const getCurrentUser = async (req, res) => {
  res.json({ user: sanitizeUser(req.user) });
};

export const refreshToken = async (req, res, next) => {
  try {
    assertValidRequest(req);

    const { refreshToken: token } = req.body;
    const payload = verifyRefreshToken(token);
    const user = await User.findById(payload.sub);

    if (!user || !user.emailVerified) {
      throw new ApiError(401, 'Invalid or expired refresh token.');
    }

    res.json(buildAuthResponse(user));
  } catch (error) {
    next(new ApiError(401, 'Invalid or expired refresh token.'));
  }
};

export const verifyEmail = async (req, res, next) => {
  try {
    assertValidRequest(req);

    const { email, otp } = req.body;
    const user = await User.findOne({ email: email.toLowerCase() }).select(
      '+emailVerificationOtpHash +emailVerificationExpiresAt'
    );

    if (!user) {
      throw new ApiError(404, 'Account not found.');
    }

    if (user.emailVerified) {
      res.json(buildAuthResponse(user));
      return;
    }

    const isExpired =
      !user.emailVerificationExpiresAt || user.emailVerificationExpiresAt.getTime() < Date.now();
    const isValidOtp = await user.compareEmailVerificationOtp(otp);

    if (isExpired || !isValidOtp) {
      throw new ApiError(400, 'Invalid or expired verification code.');
    }

    user.markEmailVerified();
    await user.save();

    res.json(buildAuthResponse(user));
  } catch (error) {
    next(error);
  }
};

export const resendVerification = async (req, res, next) => {
  try {
    assertValidRequest(req);

    const { email } = req.body;
    const user = await User.findOne({ email: email.toLowerCase() }).select(
      '+emailVerificationLastSentAt'
    );

    if (!user) {
      throw new ApiError(404, 'Account not found.');
    }

    if (user.emailVerified) {
      res.json({ message: 'Email is already verified.' });
      return;
    }

    const lastSentAt = user.emailVerificationLastSentAt?.getTime() ?? 0;
    if (Date.now() - lastSentAt < 60 * 1000) {
      throw new ApiError(429, 'Please wait before requesting another code.');
    }

    await createAndSendVerificationOtp(user);
    res.json({ message: 'Verification code sent.' });
  } catch (error) {
    next(error);
  }
};
