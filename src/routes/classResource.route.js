import express from 'express';
import {
  createResource,
  getResourcesByClass,
  deleteResource,
} from '../controller/classResource.controller.js';

const router = express.Router();

// Teacher-only
router.route('/classes/:classId/resources')
  .post(createResource);        // Add a resource to a class

// Public
router.route('/classes/:classId/resources')
  .get(getResourcesByClass);    // Get resources for a class

// Teacher-only
router.route('/resources/:id')
  .delete(deleteResource);      // Delete a class resource

export default router;
