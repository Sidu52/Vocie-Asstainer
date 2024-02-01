const express = require('express');
const router = express.Router();

const { findfunction, sendSMS } = require('../controller/home');

router.post('/findfunction', findfunction);
router.post('/sendSms', sendSMS);

module.exports = router;