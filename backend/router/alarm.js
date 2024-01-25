const express = require('express');
const router = express.Router();

const { createAlarm, getUserAlarm, getAlarmByNameandUserId, updateAlarm, deleteAlarm } = require('../controller/alaram');


router.post('/setalarm', createAlarm);
router.post('/getalarm', getUserAlarm);
router.post('/alarm', getAlarmByNameandUserId);
router.put('/updatealarm', updateAlarm);
router.post('/deletealarm', deleteAlarm);

module.exports = router;