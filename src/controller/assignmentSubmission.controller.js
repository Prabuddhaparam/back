import asyncHandler from 'express-async-handler';
import {AssignmentSubmission} from '../model/assignmentSubmission.model.js';
import {Assignment} from '../model/assignment.model.js';
import {Student} from '../model/student.model.js';

/**
 * @desc    Submit an assignment
 * @route   POST /api/assignments/:assignmentId/submissions
 * @access  Student
 */
export const submitAssignment = asyncHandler(async (req, res) => {
  const { assignmentId } = req.params;
  const { student_id, selected_option, text_input } = req.body;

  // Validate required fields
  if (!student_id || (!selected_option && !text_input)) {
    return res.status(400).json({
      success: false,
      message: 'student_id and at least one of selected_option or text_input are required.',
    });
  }

  // Verify assignment exists
  const assignment = await Assignment.findById(assignmentId);
  if (!assignment) {
    return res.status(404).json({
      success: false,
      message: 'Assignment not found.',
    });
  }

  // Prevent submissions after the deadline
  if (new Date() > new Date(assignment.deadline)) {
    return res.status(400).json({
      success: false,
      message: 'The deadline for this assignment has passed.',
    });
  }

  // Create submission
  const submission = await AssignmentSubmission.create({
    assignment_id: assignmentId,
    student_id,
    selected_option,
    text_input,
  });

  res.status(201).json({
    success: true,
    message: 'Submission successful.',
    data: submission,
  });
});

/**
 * @desc    Get submissions for an assignment
 * @route   GET /api/assignments/:assignmentId/submissions
 * @access  Teacher
 */
export const getSubmissionsByAssignment = asyncHandler(async (req, res) => {
  const submissions = await AssignmentSubmission.find({
    assignment_id: req.params.assignmentId,
  }).populate('student_id', 'name email');

  res.json({
    success: true,
    data: submissions,
  });
});

/**
 * @desc    Get submissions by a student
 * @route   GET /api/students/:studentId/submissions
 * @access  Student
 */
export const getSubmissionsByStudent = asyncHandler(async (req, res) => {
  const submissions = await AssignmentSubmission.find({
    student_id: req.params.studentId,
  }).populate('assignment_id', 'question deadline');

  res.json({
    success: true,
    data: submissions,
  });
});
