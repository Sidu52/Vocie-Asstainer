const mongoose = require('mongoose');

const alarmSchema = new mongoose.Schema({
    title: String,
    alarmTime: String,
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
}, {
    timestamps: true
});

const alarm = mongoose.model('alarm', alarmSchema);

module.exports = alarm;