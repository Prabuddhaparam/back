import express from 'express';
import {
  enrollStudent,
  getClassesForStudent,
  updateVisitCount,
} from '../controller/classStudent.controller.js';

const router = express.Router();

// Student-only
router.route('/enrollments')
  .post(enrollStudent);               // Enroll a student in a class

// Student-only
router.route('/students/:studentId/enrollments')
  .get(getClassesForStudent);         // Get classes a student is enrolled in

// Student-only
router.route('/enrollments/:id/visit')
  .patch(updateVisitCount);           // Increment visit count

export default router;
