import nodemailer from 'nodemailer';
import { env } from '../config/env.js';
import { logger } from '../utils/logger.js';

const hasSmtpConfig = Boolean(env.smtp.host && env.smtp.user && env.smtp.pass);

const transporter = hasSmtpConfig
  ? nodemailer.createTransport({
      host: env.smtp.host,
      port: env.smtp.port,
      secure: env.smtp.secure,
      auth: {
        user: env.smtp.user,
        pass: env.smtp.pass
      }
    })
  : null;

export const sendVerificationEmail = async ({ to, otp, expiresMinutes }) => {
  const subject = 'Verify your Recampus email';
  const text = [
    `Your Recampus verification code is ${otp}.`,
    `It expires in ${expiresMinutes} minutes.`,
    'If you did not create this account, you can ignore this email.'
  ].join('\n');

  if (!transporter) {
    logger.warn('SMTP is not configured. Verification OTP logged for development only.', {
      to,
      otp,
      expiresMinutes
    });
    return;
  }

  await transporter.sendMail({
    from: env.emailFrom,
    to,
    subject,
    text
  });
};
