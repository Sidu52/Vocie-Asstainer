const mongoose = require('mongoose');

const stringSchema = new mongoose.Schema({
    content: String,
    category: String,
}, {
    timestamps: true
});

const StringModel = mongoose.model('String', stringSchema);

module.exports = StringModel;