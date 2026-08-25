import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
  {
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Chat',
      required: true
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    text: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 2000
    },
    read: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

messageSchema.index({ chat: 1, createdAt: 1 });
messageSchema.index({ sender: 1, createdAt: -1 });

export const Message = mongoose.model('Message', messageSchema);
