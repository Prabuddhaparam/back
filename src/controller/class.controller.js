import asyncHandler from 'express-async-handler';
import {Class} from '../model/class.model.js';
import {Teacher} from '../model/teacher.model.js';

/**
 * @desc    Create a new class
 * @route   POST /api/classes
 * @access  Teacher
 */
export const createClass = asyncHandler(async (req, res) => {
  const { teacher_id, name, description } = req.body;

  // Validate required fields
  if (!teacher_id || !name) {
    return res.status(400).json({
      success: false,
      message: 'Teacher ID and class name are required.',
    });
  }

  // Ensure teacher exists
  const teacher = await Teacher.findById(teacher_id);
  if (!teacher) {
    return res.status(404).json({
      success: false,
      message: 'Teacher not found.',
    });
  }

  // Create class
  const cls = await Class.create({ teacher_id, name, description });
  res.status(201).json({
    success: true,
    message: 'Class created successfully',
    data: cls,
  });
});

/**
 * @desc    Get all classes (with teacher info)
 * @route   GET /api/classes
 * @access  Public
 */
export const getAllClasses = asyncHandler(async (req, res) => {
  const classes = await Class.find().populate('teacher_id', 'name email');
  res.json({
    success: true,
    data: classes,
  });
});

/**
 * @desc    Get single class by ID
 * @route   GET /api/classes/:id
 * @access  Public
 */
export const getClassById = asyncHandler(async (req, res) => {
  const cls = await Class.findById(req.params.id).populate('teacher_id', 'name email');
  if (!cls) {
    return res.status(404).json({
      success: false,
      message: 'Class not found.',
    });
  }
  res.json({
    success: true,
    data: cls,
  });
});

/**
 * @desc    Update class
 * @route   PATCH /api/classes/:id
 * @access  Teacher (Owner)
 */
export const updateClass = asyncHandler(async (req, res) => {
  const cls = await Class.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );
  if (!cls) {
    return res.status(404).json({
      success: false,
      message: 'Class not found',
    });
  }
  res.json({
    success: true,
    message: 'Class updated successfully',
    data: cls,
  });
});

/**
 * @desc    Delete class
 * @route   DELETE /api/classes/:id
 * @access  Teacher (Owner)
 */
export const deleteClass = asyncHandler(async (req, res) => {
  const cls = await Class.findByIdAndDelete(req.params.id);
  if (!cls) {
    return res.status(404).json({
      success: false,
      message: 'Class not found',
    });
  }
  res.status(204).json({
    success: true,
    message: 'Class deleted successfully',
  });
});
