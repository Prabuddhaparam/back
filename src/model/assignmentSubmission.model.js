import mongoose from 'mongoose';

const assignmentSubmissionSchema = new mongoose.Schema({
  assignment_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Assignment',
    required: true,
  },
  student_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
  },
  selected_option: {
    type: String,
    trim: true,
    default: null,
  },
  text_input: {
    type: String,
    trim: true,
    default: null,
  },
  attachment: {
    type: String,
    trim: true,
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
assignmentSubmissionSchema.pre('save', function (next) {
  this.updated_at = Date.now();
  next();
});

export const AssignmentSubmission = mongoose.model('AssignmentSubmission', assignmentSubmissionSchema);


