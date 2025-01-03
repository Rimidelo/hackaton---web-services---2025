// controllers/gameController.js
const User = require('../models/User.js');
const Game = require('../models/Game.js');

/**
 * Save game results
 */
exports.saveGameResults = async (req, res) => {
  try {
    const {
      category,
      difficulty,
      score,
      questions,
      totalTime
    } = req.body;

    const game = new Game({
      userId: req.user.userId,
      category,
      difficulty,
      score,
      questions,
      totalTime
    });

    await game.save();

    // Update user's game history
    await User.findByIdAndUpdate(req.user.userId, {
      $push: {
        gameHistory: {
          category,
          difficulty,
          score,
          timePerQuestion: totalTime / questions.length,
          totalTime
        }
      }
    });

    res
      .status(201)
      .json({ message: 'Game results saved successfully', game });
  } catch (error) {
    console.error('Save game error:', error);
    res.status(500).json({ message: 'Error saving game results' });
  }
};

/**
 * Get leaderboard
 */
exports.getLeaderboard = async (req, res) => {
  try {
    const { difficulty } = req.params;

    // Aggregate user scores by difficulty
    const leaderboard = await User.aggregate([
      // Unwind the gameHistory array
      { $unwind: '$gameHistory' },
      // Match the specified difficulty
      { $match: { 'gameHistory.difficulty': difficulty } },
      // Group by user
      {
        $group: {
          _id: '$_id',
          username: { $first: '$username' },
          avatarUrl: { $first: '$avatarUrl' },
          totalQuestions: { $sum: 10 }, // Each game has 10 questions
          correctAnswers: { $sum: '$gameHistory.score' },
          averageTime: { $avg: '$gameHistory.timePerQuestion' }
        }
      },
      // Calculate percentage
      {
        $project: {
          username: 1,
          avatarUrl: 1,
          percentage: {
            $multiply: [
              { $divide: ['$correctAnswers', '$totalQuestions'] },
              100
            ]
          },
          averageTime: 1
        }
      },
      // Sort by percentage (descending) and time (ascending)
      { $sort: { percentage: -1, averageTime: 1 } },
      // Limit to top 5
      { $limit: 5 }
    ]);

    res.json(leaderboard);
  } catch (error) {
    console.error('Leaderboard error:', error);
    res.status(500).json({ message: 'Error fetching leaderboard' });
  }
};
