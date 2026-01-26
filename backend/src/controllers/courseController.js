const Course = require('../models/Course');
const Lesson = require('../models/Lesson');

// @desc    Get all courses
// @route   GET /api/courses
// @access  Public
exports.getAllCourses = async (req, res, next) => {
  try {
    const courses = await Course.find().populate('lessons').sort({ year: 1, order: 1 });

    res.status(200).json({
      success: true,
      count: courses.length,
      data: courses
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get courses by year
// @route   GET /api/courses/year/:year
// @access  Public
exports.getCoursesByYear = async (req, res, next) => {
  try {
    const courses = await Course.find({ year: req.params.year })
      .populate('lessons')
      .sort({ order: 1 });

    res.status(200).json({
      success: true,
      count: courses.length,
      data: courses
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single course
// @route   GET /api/courses/:courseId
// @access  Public
exports.getCourse = async (req, res, next) => {
  try {
    const course = await Course.findOne({ courseId: req.params.courseId })
      .populate('lessons');

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    res.status(200).json({
      success: true,
      data: course
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create course (Admin only - for seeding)
// @route   POST /api/courses
// @access  Private/Admin
exports.createCourse = async (req, res, next) => {
  try {
    const course = await Course.create(req.body);

    res.status(201).json({
      success: true,
      data: course
    });
  } catch (error) {
    next(error);
  }
};