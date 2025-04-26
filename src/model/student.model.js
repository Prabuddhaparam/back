import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
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

},{timestamps: true});


const Student = mongoose.model('Student', studentSchema);
export { Student };
