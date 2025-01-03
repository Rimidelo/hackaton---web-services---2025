const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },

    username: {
        type: String,
        required: true,
        trim: true

    },
    password: {
        type: String,
        required: true
    },
    avatarUrl: {
        type: String,
        required: true
    },
    gameHistory: [{
        date: { type: Date, default: Date.now },
        category: String,
        difficulty: {
            type: String,
            enum: ['easy', 'medium', 'hard']
        },
        score: Number,
    }]
});

module.exports = mongoose.model('User', userSchema);