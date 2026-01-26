const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  courseId: {
    type: String,
    required: true,
    unique: true
  },
  icon: {
    type: String,
    default: '📚'
  },
  duration: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true,
    enum: [1, 2]
  },
  order: {
    type: Number,
    required: true
  },
  lessons: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lesson'
  }],
  project: {
    title: String,
    description: String,
    duration: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Course', CourseSchema);