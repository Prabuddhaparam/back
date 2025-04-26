import asyncHandler from 'express-async-handler';
import {Student} from '../model/student.model.js';

/**
 * @desc    Register a new student
 * @route   POST /api/students
 * @access  Public
 */
export const createStudent = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Validate required fields
  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Name, email, and password are required.',
    });
  }

  // Check if student already exists
  const existingStudent = await Student.findOne({ email });
  if (existingStudent) {
    return res.status(409).json({
      success: false,
      message: 'Student with this email already exists.',
    });
  }

  // Create new student
  const student = await Student.create({ name, email, password });

  res.status(201).json({
    success: true,
    message: 'Student created successfully',
    data: student,
  });
});

/**
 * @desc    Get all students (with pagination)
 * @route   GET /api/students
 * @access  Admin
 */
export const getAllStudents = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const skip = (page - 1) * limit;

  const [total, students] = await Promise.all([
    Student.countDocuments(),
    Student.find().skip(skip).limit(limit),
  ]);

  res.json({
    success: true,
    data: students,
    pagination: {
      total,
      page,
      pages: Math.ceil(total / limit),
    },
  });
});

/**
 * @desc    Get single student by ID
 * @route   GET /api/students/:id
 * @access  Public
 */
export const getStudentById = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.params.id);

  if (!student) {
    return res.status(404).json({
      success: false,
      message: 'Student not found',
    });
  }

  res.json({
    success: true,
    data: student,
  });
});

/**
 * @desc    Update student
 * @route   PATCH /api/students/:id
 * @access  Admin/Student (Self)
 */
export const updateStudent = asyncHandler(async (req, res) => {
  const { name, email, password, ...otherFields } = req.body;

  // Prevent updating sensitive fields directly
  const updateData = { ...otherFields };
  if (name) updateData.name = name;
  if (email) updateData.email = email;
  if (password) updateData.password = password;

  const student = await Student.findByIdAndUpdate(
    req.params.id,
    updateData,
    { new: true, runValidators: true }
  );

  if (!student) {
    return res.status(404).json({
      success: false,
      message: 'Student not found',
    });
  }

  res.json({
    success: true,
    message: 'Student updated successfully',
    data: student,
  });
});

/**
 * @desc    Delete student
 * @route   DELETE /api/students/:id
 * @access  Admin
 */
export const deleteStudent = asyncHandler(async (req, res) => {
  const student = await Student.findByIdAndDelete(req.params.id);

  if (!student) {
    return res.status(404).json({
      success: false,
      message: 'Student not found',
    });
  }

  res.status(200).json({
    success: true,
    message: 'Student deleted successfully',
  });
});
