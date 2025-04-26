import mongoose from 'mongoose';

const teacherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Email validation
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'pending'],
    default: 'pending',
  },
  verification_code: {
    type: String,
    default: null,
  },
  profile_image: {
    type: String,
    default: null,
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
teacherSchema.pre('save', function (next) {
  this.updated_at = Date.now();
  next();
});

export const Teacher = mongoose.model('Teacher', teacherSchema);


