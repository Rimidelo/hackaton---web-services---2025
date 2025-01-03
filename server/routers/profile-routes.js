const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth-middleware.js');
const { getUserProfile } = require('../controllers/profile-controller.js');

// GET /users/profile
router.get('/profile', authenticateToken, getUserProfile);

module.exports = router;
