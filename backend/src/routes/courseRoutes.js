const express = require('express');
const {
  getAllCourses,
  getCoursesByYear,
  getCourse,
  createCourse
} = require('../controllers/courseController');

const router = express.Router();

router.route('/')
  .get(getAllCourses)
  .post(createCourse);

router.get('/year/:year', getCoursesByYear);
router.get('/:courseId', getCourse);

module.exports = router;