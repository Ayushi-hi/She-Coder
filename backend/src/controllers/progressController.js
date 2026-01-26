const Progress = require('../models/Progress');
const User = require('../models/User');
const Course = require('../models/Course');

// @desc    Get user progress for all courses
// @route   GET /api/progress
// @access  Private
exports.getAllProgress = async (req, res, next) => {
  try {
    const progress = await Progress.find({ user: req.user.id })
      .populate('user', 'name email streak');

    res.status(200).json({
      success: true,
      count: progress.length,
      data: progress
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user progress for specific course
// @route   GET /api/progress/:courseId
// @access  Private
exports.getCourseProgress = async (req, res, next) => {
  try {
    let progress = await Progress.findOne({
      user: req.user.id,
      courseId: req.params.courseId
    });

    // If no progress exists, create one
    if (!progress) {
      progress = await Progress.create({
        user: req.user.id,
        courseId: req.params.courseId,
        completedLessons: [],
        progress: 0
      });
    }

    res.status(200).json({
      success: true,
      data: progress
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Mark lesson as complete
// @route   POST /api/progress/:courseId/lesson/:lessonId
// @access  Private
exports.completeLesson = async (req, res, next) => {
  try {
    const { courseId, lessonId } = req.params;

    // Find or create progress
    let progress = await Progress.findOne({
      user: req.user.id,
      courseId
    });

    if (!progress) {
      progress = new Progress({
        user: req.user.id,
        courseId,
        completedLessons: []
      });
    }

    // Check if lesson already completed
    const alreadyCompleted = progress.completedLessons.some(
      lesson => lesson.lessonId === parseInt(lessonId)
    );

    if (!alreadyCompleted) {
      progress.completedLessons.push({
        lessonId: parseInt(lessonId),
        completedAt: new Date()
      });

      // Get total lessons for this course
      const course = await Course.findOne({ courseId });
      if (course) {
        const totalLessons = course.lessons.length;
        progress.progress = Math.round(
          (progress.completedLessons.length / totalLessons) * 100
        );
      }

      // Update user streak
      const user = await User.findById(req.user.id);
      const today = new Date().setHours(0, 0, 0, 0);
      const lastActivity = new Date(user.lastActivity).setHours(0, 0, 0, 0);
      const dayDiff = (today - lastActivity) / (1000 * 60 * 60 * 24);

      if (dayDiff === 1) {
        user.streak += 1;
      } else if (dayDiff > 1) {
        user.streak = 1;
      }

      user.lastActivity = new Date();
      user.totalPoints += 10;
      await user.save();

      progress.lastAccessedAt = new Date();
      await progress.save();
    }

    res.status(200).json({
      success: true,
      data: progress,
      streak: (await User.findById(req.user.id)).streak
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Submit project
// @route   POST /api/progress/:courseId/project
// @access  Private
exports.submitProject = async (req, res, next) => {
  try {
    const { courseId } = req.params;
    const { projectUrl } = req.body;

    const progress = await Progress.findOne({
      user: req.user.id,
      courseId
    });

    if (!progress) {
      return res.status(404).json({
        success: false,
        message: 'Progress not found'
      });
    }

    if (progress.progress < 100) {
      return res.status(400).json({
        success: false,
        message: 'Complete all lessons before submitting project'
      });
    }

    progress.projectSubmitted = true;
    progress.projectUrl = projectUrl;
    progress.projectSubmittedAt = new Date();
    progress.certificateIssued = true;

    await progress.save();

    // Award bonus points
    const user = await User.findById(req.user.id);
    user.totalPoints += 100;
    await user.save();

    res.status(200).json({
      success: true,
      data: progress,
      message: 'Project submitted successfully! Certificate issued.'
    });
  } catch (error) {
    next(error);
  }
};