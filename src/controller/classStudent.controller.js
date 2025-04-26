import asyncHandler from 'express-async-handler';
import {ClassStudent} from '../model/classStudent.model.js';
import {Class} from '../model/class.model.js';
import {Student} from '../model/student.model.js';

/**
 * @desc    Enroll a student in a class
 * @route   POST /api/enrollments
 * @access  Student
 */
export const enrollStudent = asyncHandler(async (req, res) => {
  const { class_id, student_id } = req.body;

  // Validate required fields
  if (!class_id || !student_id) {
    return res.status(400).json({
      success: false,
      message: 'class_id and student_id are required.',
    });
  }

  // Ensure class and student exist
  const [cls, student] = await Promise.all([
    Class.findById(class_id),
    Student.findById(student_id),
  ]);

  if (!cls || !student) {
    return res.status(404).json({
      success: false,
      message: 'Class or Student not found.',
    });
  }

  // Prevent duplicate enrollments
  const existing = await ClassStudent.findOne({ class_id, student_id });
  if (existing) {
    return res.status(409).json({
      success: false,
      message: 'Student already enrolled in this class.',
    });
  }

  // Create enrollment
  const enrollment = await ClassStudent.create({ class_id, student_id });
  res.status(201).json({
    success: true,
    message: 'Enrollment successful',
    data: enrollment,
  });
});

/**
 * @desc    Get all classes a student is enrolled in
 * @route   GET /api/students/:studentId/enrollments
 * @access  Student
 */
export const getClassesForStudent = asyncHandler(async (req, res) => {
  const enrollments = await ClassStudent.find({ student_id: req.params.studentId })
    .populate('class_id', 'name description');

  res.json({
    success: true,
    data: enrollments,
  });
});

/**
 * @desc    Increment visit count for an enrollment
 * @route   PATCH /api/enrollments/:id/visit
 * @access  Student
 */
export const updateVisitCount = asyncHandler(async (req, res) => {
  const updated = await ClassStudent.findByIdAndUpdate(
    req.params.id,
    { $inc: { visit_count: 1 } },
    { new: true }
  );

  if (!updated) {
    return res.status(404).json({
      success: false,
      message: 'Enrollment not found.',
    });
  }

  res.json({
    success: true,
    message: 'Visit count updated successfully.',
    data: updated,
  });
});
