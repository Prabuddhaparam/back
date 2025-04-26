import mongoose from 'mongoose';

const classStudentSchema = new mongoose.Schema({
  class_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class',
    required: true,
  },
  student_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
  },
  class_time: {
    type: String,
    required: true,
    trim: true,
  },
  visit_count: {
    type: Number,
    default: 0,
    min: 0,
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
classStudentSchema.pre('save', function (next) {
  this.updated_at = Date.now();
  next();
});

export const ClassStudent = mongoose.model('ClassStudent', classStudentSchema);


