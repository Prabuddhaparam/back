import mongoose from 'mongoose';

const classSchema = new mongoose.Schema({
  teacher_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
    default: null,
  },
  featured_image: {
    type: String,
    default: null,
  },
  schedule: {
    type: String,
    required: true,
    trim: true,
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
classSchema.pre('save', function (next) {
  this.updated_at = Date.now();
  next();
});

export const Class = mongoose.model('Class', classSchema);


