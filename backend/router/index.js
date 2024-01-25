const express = require('express');
const router = express.Router();

const { findfunction } = require('../controller/home');

router.post('/findfunction', findfunction);
// app.use("/todo", require('./router/index'));

module.exports = router;