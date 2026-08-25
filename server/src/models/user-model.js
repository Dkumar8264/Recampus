import bcrypt from 'bcryptjs';
import crypto from 'node:crypto';
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 80
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required() {
        return this.authProvider === 'local';
      },
      minlength: 8,
      select: false
    },
    authProvider: {
      type: String,
      enum: ['local', 'google'],
      default: 'local'
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true
    },
    branch: {
      type: String,
      required: true,
      trim: true,
      maxlength: 80
    },
    year: {
      type: Number,
      required: true,
      min: 1,
      max: 8
    },
    profilePicture: {
      type: String,
      default: ''
    },
    role: {
      type: String,
      enum: ['student', 'admin'],
      default: 'student'
    },
    emailVerified: {
      type: Boolean,
      default: false
    },
    emailVerificationOtpHash: {
      type: String,
      select: false
    },
    emailVerificationExpiresAt: {
      type: Date,
      select: false
    },
    emailVerificationLastSentAt: {
      type: Date,
      select: false
    }
  },
  { timestamps: true }
);

userSchema.pre('save', async function hashPassword(next) {
  if (!this.isModified('password')) {
    next();
    return;
  }

  if (!this.password) {
    next();
    return;
  }

  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = function comparePassword(candidatePassword) {
  if (!this.password) {
    return false;
  }

  return bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.setEmailVerificationOtp = async function setEmailVerificationOtp(otp, expiresAt) {
  this.emailVerificationOtpHash = await bcrypt.hash(otp, 12);
  this.emailVerificationExpiresAt = expiresAt;
  this.emailVerificationLastSentAt = new Date();
};

userSchema.methods.compareEmailVerificationOtp = function compareEmailVerificationOtp(candidateOtp) {
  if (!this.emailVerificationOtpHash) {
    return false;
  }

  return bcrypt.compare(candidateOtp, this.emailVerificationOtpHash);
};

userSchema.methods.markEmailVerified = function markEmailVerified() {
  this.emailVerified = true;
  this.emailVerificationOtpHash = undefined;
  this.emailVerificationExpiresAt = undefined;
  this.emailVerificationLastSentAt = undefined;
};

userSchema.statics.generateEmailVerificationOtp = function generateEmailVerificationOtp() {
  return crypto.randomInt(100000, 999999).toString();
};

export const User = mongoose.model('User', userSchema);
