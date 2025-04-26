import express from 'express';
import {
  createTeacher,
  getAllTeachers,
  getTeacherById,
  updateTeacher,
  deleteTeacher,
} from '../controller/teacher.controller.js';

const router = express.Router();

// Public routes
router.route('/')
  .post(createTeacher)     // Create a new teacher
  .get(getAllTeachers);    // Get all teachers

router.route('/:id')
  .get(getTeacherById)     // Get a teacher by ID
  .patch(updateTeacher)    // Update a teacher
  .delete(deleteTeacher);  // Delete a teacher

export default router;
