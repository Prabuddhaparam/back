import express from 'express';
import {
  createClass,
  getAllClasses,
  getClassById,
  updateClass,
  deleteClass,
} from '../controller/class.controller.js';

const router = express.Router();

// Teacher-only
router.route('/')
  .post(createClass);      // Create a new class

// Public
router.route('/')
  .get(getAllClasses);     // Get all classes

router.route('/:id')
  .get(getClassById)       // Get a class by ID
  .patch(updateClass)      // Update a class
  .delete(deleteClass);    // Delete a class

export default router;
