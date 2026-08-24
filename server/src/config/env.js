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
  mongoUri: process.env.MONGO_URI,
  allowedEmailDomain: process.env.ALLOWED_EMAIL_DOMAIN ?? 'bmsit.in',
  jwtAccessSecret: process.env.JWT_ACCESS_SECRET,
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
  jwtAccessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN ?? '15m',
  jwtRefreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN ?? '7d'
};
