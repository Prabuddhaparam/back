import asyncHandler from 'express-async-handler';
import {Assignment} from '../model/assignment.model.js';
import {Class} from '../model/class.model.js';

/**
 * @desc    Create a new assignment
 * @route   POST /api/classes/:classId/assignments
 * @access  Teacher
 */
export const createAssignment = asyncHandler(async (req, res) => {
  const { classId } = req.params;
  const { question, options, correct_option, deadline } = req.body;

  // Validate required fields
  if (!question || !options || !correct_option || !deadline) {
    return res.status(400).json({
      success: false,
      message: 'All fields are required: question, options, correct_option, deadline.',
    });
  }

  // Ensure options array has at least two options
  if (!Array.isArray(options) || options.length < 2) {
    return res.status(400).json({
      success: false,
      message: 'Options must be an array with at least two items.',
    });
  }

  // Ensure correct_option is one of the options
  if (!options.includes(correct_option)) {
    return res.status(400).json({
      success: false,
      message: 'The correct_option must be one of the provided options.',
    });
  }

  // Verify class exists
  const cls = await Class.findById(classId);
  if (!cls) {
    return res.status(404).json({
      success: false,
      message: 'Class not found.',
    });
  }

  // Create assignment
  const assignment = await Assignment.create({
    class_id: classId,
    question,
    options,
    correct_option,
    deadline,
  });

  res.status(201).json({
    success: true,
    message: 'Assignment created successfully',
    data: assignment,
  });
});

/**
 * @desc    Get assignments for a class
 * @route   GET /api/classes/:classId/assignments
 * @access  Public
 */
export const getAssignmentsByClass = asyncHandler(async (req, res) => {
  const assignments = await Assignment.find({
    class_id: req.params.classId,
  });

  res.json({
    success: true,
    data: assignments,
  });
});

/**
 * @desc    Get a single assignment
 * @route   GET /api/assignments/:id
 * @access  Public
 */
export const getAssignmentById = asyncHandler(async (req, res) => {
  const assignment = await Assignment.findById(req.params.id);

  if (!assignment) {
    return res.status(404).json({
      success: false,
      message: 'Assignment not found.',
    });
  }

  res.json({
    success: true,
    data: assignment,
  });
});
