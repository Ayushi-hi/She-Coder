const mongoose = require('mongoose');

const ProgressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  courseId: {
    type: String,
    required: true
  },
  completedLessons: [{
    lessonId: Number,
    completedAt: {
      type: Date,
      default: Date.now
    }
  }],
  progress: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  projectSubmitted: {
    type: Boolean,
    default: false
  },
  projectUrl: {
    type: String
  },
  projectSubmittedAt: {
    type: Date
  },
  certificateIssued: {
    type: Boolean,
    default: false
  },
  startedAt: {
    type: Date,
    default: Date.now
  },
  lastAccessedAt: {
    type: Date,
    default: Date.now
  }
});

// Create compound index for user and course
ProgressSchema.index({ user: 1, courseId: 1 }, { unique: true });

module.exports = mongoose.model('Progress', ProgressSchema);