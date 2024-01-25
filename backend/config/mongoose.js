require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL);// Connect mongoose using URL
const db = mongoose.connection;
db.on('error', console.error.bind(console, "Error connecting to MongoDB"));

db.once('open', () => {
    console.log("Connected to Database :: MongoDB ")
});

module.exports = db;