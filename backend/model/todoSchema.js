const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    title: String,
    completed: Boolean,
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
}, {
    timestamps: true
});

const todo = mongoose.model('todo', todoSchema);

module.exports = todo;