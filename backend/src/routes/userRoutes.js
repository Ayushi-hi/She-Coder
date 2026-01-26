const express = require('express');
const {
  getProfile,
  updateProfile,
  getStreak
} = require('../controllers/userController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// All routes are protected
router.use(protect);

router.route('/profile')
  .get(getProfile)
  .put(updateProfile);

router.get('/streak', getStreak);

module.exports = router;