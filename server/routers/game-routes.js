// routes/gameRoutes.js
const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth-middleware.js');
const {
    saveGameResults,
    getLeaderboard
} = require('../controllers/gameController');

// Save game results (POST /api/games)
router.post('/games', authenticateToken, saveGameResults);

// Get leaderboard (GET /api/leaderboard/:difficulty)
router.get('/leaderboard/:difficulty', getLeaderboard);

module.exports = router;
