const mongoose = require('mongoose');

const LessonSchema = new mongoose.Schema({
  courseId: {
    type: String,
    required: true
  },
  lessonId: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['video', 'interactive', 'practice', 'quiz'],
    default: 'video'
  },
  content: {
    type: String
  },
  videoUrl: {
    type: String
  },
  order: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Lesson', LessonSchema);