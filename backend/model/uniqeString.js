const mongoose = require('mongoose');

const uniquestringSchema = new mongoose.Schema({
    content: String,
}, {
    timestamps: true
});

const uniqueStr = mongoose.model('uniqueString', uniquestringSchema);

module.exports = uniqueStr;