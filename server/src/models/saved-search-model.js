import mongoose from 'mongoose';
import { campusLocations, listingCategories, listingTypes } from './listing-model.js';

const savedSearchSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    label: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 80
    },
    keyword: {
      type: String,
      trim: true,
      maxlength: 80,
      default: ''
    },
    type: {
      type: String,
      enum: listingTypes
    },
    category: {
      type: String,
      enum: listingCategories
    },
    location: {
      type: String,
      enum: campusLocations
    },
    notificationsEnabled: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

savedSearchSchema.index({ user: 1, createdAt: -1 });
savedSearchSchema.index({ type: 1, category: 1, location: 1, notificationsEnabled: 1 });

export const SavedSearch = mongoose.model('SavedSearch', savedSearchSchema);
