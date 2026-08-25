import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema(
  {
    listing: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Listing',
      required: true
    },
    reportedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    reason: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 600
    },
    status: {
      type: String,
      enum: ['pending', 'reviewed'],
      default: 'pending'
    }
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

reportSchema.index({ status: 1, createdAt: -1 });
reportSchema.index({ listing: 1, reportedBy: 1 }, { unique: true });

export const Report = mongoose.model('Report', reportSchema);
