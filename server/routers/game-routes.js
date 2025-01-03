const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth-middleware.js');
const {
    saveGameResults,
    getLeaderboard
} = require('../controllers/game-controller');

// Save game results
router.post('/', authenticateToken, saveGameResults);

// Get leaderboard 
router.get('/leaderboard/:difficulty', getLeaderboard);

module.exports = router;