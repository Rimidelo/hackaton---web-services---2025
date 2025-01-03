// controllers/userController.js
const User = require('../models/User.js');

/**
 * Get user profile and game history
 */
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password').lean();

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Calculate statistics for each difficulty level
    const stats = ['easy', 'medium', 'hard'].reduce((acc, difficulty) => {
      const gamesAtDifficulty = user.gameHistory.filter(
        (game) => game.difficulty === difficulty
      );

      if (gamesAtDifficulty.length > 0) {
        acc[difficulty] = {
          totalGames: gamesAtDifficulty.length,
          averageScore:
            gamesAtDifficulty.reduce((sum, game) => sum + game.score, 0) /
            gamesAtDifficulty.length,
          averageTime:
            gamesAtDifficulty.reduce(
              (sum, game) => sum + game.timePerQuestion,
              0
            ) / gamesAtDifficulty.length,
        };
      } else {
        acc[difficulty] = {
          totalGames: 0,
          averageScore: 0,
          averageTime: 0,
        };
      }

      return acc;
    }, {});

    res.json({
      user,
      stats,
    });
  } catch (error) {
    console.error('Profile error:', error);
    res.status(500).json({ message: 'Error fetching user profile' });
  }
};
