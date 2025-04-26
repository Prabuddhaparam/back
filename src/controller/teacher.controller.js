import asyncHandler from 'express-async-handler';
import {Teacher} from '../model/teacher.model.js';

/**
 * @desc    Register a new teacher
 * @route   POST /api/teachers
 * @access  Public
 */
export const createTeacher = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Validate required fields
  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Name, email, and password are required.',
    });
  }

  // Check if teacher already exists
  const existingTeacher = await Teacher.findOne({ email });
  if (existingTeacher) {
    return res.status(409).json({
      success: false,
      message: 'Teacher with this email already exists.',
    });
  }

  // Create new teacher
  const teacher = await Teacher.create({ name, email, password });

  res.status(201).json({
    success: true,
    message: 'Teacher created successfully',
    data: teacher,
  });
});

/**
 * @desc    Get all teachers (paginated)
 * @route   GET /api/teachers
 * @access  Admin
 */
export const getAllTeachers = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const skip = (page - 1) * limit;

  const [total, teachers] = await Promise.all([
    Teacher.countDocuments(),
    Teacher.find().skip(skip).limit(limit),
  ]);

  res.json({
    success: true,
    data: teachers,
    pagination: {
      total,
      page,
      pages: Math.ceil(total / limit),
    },
  });
});

/**
 * @desc    Get single teacher by ID
 * @route   GET /api/teachers/:id
 * @access  Public
 */
export const getTeacherById = asyncHandler(async (req, res) => {
  const teacher = await Teacher.findById(req.params.id);

  if (!teacher) {
    return res.status(404).json({
      success: false,
      message: 'Teacher not found',
    });
  }

  res.json({
    success: true,
    data: teacher,
  });
});

/**
 * @desc    Update teacher
 * @route   PATCH /api/teachers/:id
 * @access  Admin/Teacher (Self)
 */
export const updateTeacher = asyncHandler(async (req, res) => {
  const { name, email, password, ...otherFields } = req.body;

  // Prevent updating sensitive fields directly
  const updateData = { ...otherFields };
  if (name) updateData.name = name;
  if (email) updateData.email = email;
  if (password) updateData.password = password;

  const teacher = await Teacher.findByIdAndUpdate(
    req.params.id,
    updateData,
    { new: true, runValidators: true }
  );

  if (!teacher) {
    return res.status(404).json({
      success: false,
      message: 'Teacher not found',
    });
  }

  res.json({
    success: true,
    message: 'Teacher updated successfully',
    data: teacher,
  });
});

/**
 * @desc    Delete teacher
 * @route   DELETE /api/teachers/:id
 * @access  Admin
 */
export const deleteTeacher = asyncHandler(async (req, res) => {
  const teacher = await Teacher.findByIdAndDelete(req.params.id);

  if (!teacher) {
    return res.status(404).json({
      success: false,
      message: 'Teacher not found',
    });
  }

  res.status(200).json({
    success: true,
    message: 'Teacher deleted successfully',
  });
});
