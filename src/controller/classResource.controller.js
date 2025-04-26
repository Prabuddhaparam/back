import asyncHandler from 'express-async-handler';
import {ClassResource} from '../model/classResource.model.js';
import {Class} from '../model/class.model.js';

/**
 * @desc    Add a resource to a class
 * @route   POST /api/classes/:classId/resources
 * @access  Teacher
 */
export const createResource = asyncHandler(async (req, res) => {
  const { classId } = req.params;
  const { name, url } = req.body;

  // Validate required fields
  if (!name || !url) {
    return res.status(400).json({
      success: false,
      message: 'Resource name and URL are required.',
    });
  }

  // Ensure the class exists
  const cls = await Class.findById(classId);
  if (!cls) {
    return res.status(404).json({
      success: false,
      message: 'Class not found.',
    });
  }

  // Create the resource
  const resource = await ClassResource.create({
    class_id: classId,
    name,
    url,
  });

  res.status(201).json({
    success: true,
    message: 'Resource added successfully',
    data: resource,
  });
});

/**
 * @desc    Get all resources for a class
 * @route   GET /api/classes/:classId/resources
 * @access  Public
 */
export const getResourcesByClass = asyncHandler(async (req, res) => {
  const resources = await ClassResource.find({
    class_id: req.params.classId,
  });

  res.json({
    success: true,
    data: resources,
  });
});

/**
 * @desc    Delete a class resource
 * @route   DELETE /api/resources/:id
 * @access  Teacher
 */
export const deleteResource = asyncHandler(async (req, res) => {
  const resource = await ClassResource.findByIdAndDelete(req.params.id);

  if (!resource) {
    return res.status(404).json({
      success: false,
      message: 'Resource not found.',
    });
  }

  res.status(200).json({
    success: true,
    message: 'Resource deleted successfully.',
  });
});