const mongoose = require('mongoose');
const { diffIndexes } = require('./User');

const gameSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    category: {
        type: String,
        required: true
    },
    difficulty: {
        type: String,
        enum: ['easy', 'medium', 'hard'],
        required: true
    },
    score: {
        type: Number,
        required: true
    },
    questions: [{
        question: String,
        correct_answer: String,
        user_answer: String,
    }],
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Game', gameSchema);

