import express from 'express';
import {
  submitAssignment,
  getSubmissionsByAssignment,
  getSubmissionsByStudent,
} from '../controller/assignmentSubmission.controller.js';

const router = express.Router();

// Student-only
router.route('/assignments/:assignmentId/submissions')
  .post(submitAssignment);             // Submit an assignment

// Teacher-only
router.route('/assignments/:assignmentId/submissions')
  .get(getSubmissionsByAssignment);    // Get submissions for an assignment

// Student-only
router.route('/students/:studentId/submissions')
  .get(getSubmissionsByStudent);       // Get submissions by a student

export default router;
