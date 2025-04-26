import mongoose from 'mongoose';

const classResourceSchema = new mongoose.Schema({
  class_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class',
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  url: {
    type: String,
    required: true,
    trim: true,
    match: /^(https?:\/\/[^\s$.?#].[^\s]*)$/, // Validates URL format
  },
  created_at: {
    type: Date,
    default: Date.now,
    immutable: true,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

// Middleware to update `updated_at` before saving
classResourceSchema.pre('save', function (next) {
  this.updated_at = Date.now();
  next();
});

export const ClassResource = mongoose.model('ClassResource', classResourceSchema);


