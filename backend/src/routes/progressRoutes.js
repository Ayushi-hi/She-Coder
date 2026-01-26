const express = require('express');
const {
  getAllProgress,
  getCourseProgress,
  completeLesson,
  submitProject
} = require('../controllers/progressController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// All routes are protected
router.use(protect);

router.get('/', getAllProgress);
router.get('/:courseId', getCourseProgress);
router.post('/:courseId/lesson/:lessonId', completeLesson);
router.post('/:courseId/project', submitProject);

module.exports = router;