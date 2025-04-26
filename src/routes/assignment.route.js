import express from 'express';
import {
  createAssignment,
  getAssignmentsByClass,
  getAssignmentById,
} from '../controller/assignment.controller.js';

const router = express.Router();

// Teacher-only
router.route('/classes/:classId/assignments')
  .post(createAssignment);             // Create a new assignment

// Public
router.route('/classes/:classId/assignments')
  .get(getAssignmentsByClass);         // Get assignments for a class

// Public
router.route('/assignments/:id')
  .get(getAssignmentById);             // Get a single assignment

export default router;
