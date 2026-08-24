import dotenv from 'dotenv';

dotenv.config();

const requiredValues = ['MONGO_URI', 'JWT_ACCESS_SECRET', 'JWT_REFRESH_SECRET'];

for (const key of requiredValues) {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
}

export const env = {
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: Number(process.env.PORT ?? 5000),
  clientUrl: process.env.CLIENT_URL ?? 'http://localhost:5173',
  allowedOrigins: (process.env.ALLOWED_ORIGINS ?? process.env.CLIENT_URL ?? 'http://localhost:5173')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean),
  mongoUri: process.env.MONGO_URI,
  allowedEmailDomain: process.env.ALLOWED_EMAIL_DOMAIN ?? 'bmsit.in',
  jwtAccessSecret: process.env.JWT_ACCESS_SECRET,
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
  jwtAccessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN ?? '15m',
  jwtRefreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN ?? '7d',
  emailFrom: process.env.EMAIL_FROM ?? 'CampusHub <no-reply@campushub.local>',
  smtp: {
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: process.env.SMTP_SECURE === 'true',
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  },
  verificationOtpExpiresMinutes: Number(process.env.VERIFICATION_OTP_EXPIRES_MINUTES ?? 10),
  maxImageSizeMb: Number(process.env.MAX_IMAGE_SIZE_MB ?? 5),
  allowedImageMimeTypes: (process.env.ALLOWED_IMAGE_MIME_TYPES ?? 'image/jpeg,image/png,image/webp')
    .split(',')
    .map((mimeType) => mimeType.trim())
    .filter(Boolean)
};
