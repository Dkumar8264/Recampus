import mongoose from 'mongoose';

export const listingTypes = ['lost', 'found', 'sale'];
export const listingCategories = ['books', 'electronics', 'cycles', 'stationery', 'clothing', 'other'];
export const campusLocations = [
  'library',
  'hostel-block-a',
  'hostel-block-b',
  'canteen',
  'main-block',
  'sports-ground',
  'other'
];

const listingSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: listingTypes,
      required: true
    },
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 120
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
      maxlength: 1200
    },
    category: {
      type: String,
      enum: listingCategories,
      required: true
    },
    images: {
      type: [String],
      default: []
    },
    location: {
      type: String,
      enum: campusLocations,
      required: true
    },
    price: {
      type: Number,
      min: 0
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    status: {
      type: String,
      enum: ['active', 'resolved'],
      default: 'active'
    }
  },
  { timestamps: true }
);

listingSchema.index({ title: 'text', description: 'text' });
listingSchema.index({ type: 1, category: 1, status: 1, createdAt: -1 });

listingSchema.pre('validate', function validateSalePrice(next) {
  if (this.type === 'sale' && (this.price === undefined || this.price === null)) {
    this.invalidate('price', 'Price is required for sale listings.');
  }

  if (this.type !== 'sale') {
    this.price = undefined;
  }

  next();
});

export const Listing = mongoose.model('Listing', listingSchema);
