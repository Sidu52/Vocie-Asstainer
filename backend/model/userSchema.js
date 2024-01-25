const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    nickname: {
        type: String,
        unique: true,
        required: true
    }
}, {
    timestamps: true
});

const user = mongoose.model('user', userSchema);

module.exports = user;