import express from 'express';
import {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
} from '../controller/student.controller.js';

const router = express.Router();

// Public routes
router.route('/')
  .post(createStudent) // Create a new student
  .get(getAllStudents); // Get all students

router.route('/:id')
  .get(getStudentById) // Get a student by ID
  .patch(updateStudent) // Update a student
  .delete(deleteStudent); // Delete a student

export default router;
