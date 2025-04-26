import mongoose from 'mongoose';

const assignmentSchema = new mongoose.Schema({
  class_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class',
    required: true,
  },
  question: {
    type: String,
    required: true,
    trim: true,
  },
  options: {
    type: [String],
    validate: {
      validator: function (arr) {
        return arr.length >= 2; // Ensure at least two options
      },
      message: 'There must be at least two options.',
    },
  },
  correct_option: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: function (value) {
        return this.options.includes(value); // Ensure the correct option is one of the options
      },
      message: 'The correct option must be one of the provided options.',
    },
  },
  deadline: {
    type: Date,
    required: true,
    validate: {
      validator: function (value) {
        return value > Date.now(); // Ensure the deadline is in the future
      },
      message: 'The deadline must be a future date.',
    },
  },
  attachment: {
    type: String,
    default: null,
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
assignmentSchema.pre('save', function (next) {
  this.updated_at = Date.now();
  next();
});

export const Assignment = mongoose.model('Assignment', assignmentSchema);


