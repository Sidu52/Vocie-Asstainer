const Alarm = require('../model/alarmSchema');
const User = require('../model/userSchema');
//Create a new Todo

async function createAlarm(req, res) {
    try {
        const { userid, title, alarmTime } = req.body;
        const userFind = await User.findById(userid);
        if (!userFind) {
            return res.status(200).json({ message: "User not found" });
        }
        const alarmExists = await Alarm.findOne({ alarmTime, userid: userFind.id });
        if (alarmExists) {
            return res.status(200).json({ message: "Alarm already created" });
        }
        const alarm = await Alarm.create({ title, alarmTime, userid: userFind.id });

        if (alarm) {
            return res.status(201).json({ message: "Alarm has been created successfully", data: alarm });
        } else {
            return res.status(200).json({ message: "Error sheduling alarm" });
        }
    } catch (error) {
        res.status(500).json({
            message: `An error occurred while sheduling the alarm: ${error}`,
        });
    }
}


async function getUserAlarm(req, res) {
    const { userid } = req.body;
    try {
        const allAlarm = await Alarm.find({ userid });

        if (allAlarm.length > 0) {
            return res.status(200).json({ message: "Alarm have been found successfully", data: allAlarm });
        } else {
            return res.status(200).json({ message: "Alarm not found", data: [] });
        }
    } catch (error) {
        res.status(500).json({
            message: `An error occurred while retrieving todos: ${error}`,
        });
    }
}


// Get a Todo by id
async function getAlarmByNameandUserId(req, res) {
    const { userid, alarmTime } = req.body;
    try {
        const getAlarm = await Alarm.findOne({ userid, alarmTime });
        if (getAlarm) {
            return res.status(200).json({ message: "User alarm found successfully", data: getAlarm });
        } else {
            return res.status(200).json({ message: "Alarm not found" });
        }
    } catch (error) {
        res.status(500).json({
            message: `An error occurred while retrieving the alarm: ${error}`,
        });
    }
}


async function updateAlarm(req, res) {
    const { alarmTime, userid, updateData } = req.body;
    try {
        const alarm = await Alarm.findOne({ alarmTime, userid });

        if (!alarm) {
            return res.status(200).json({ message: "Alarm not found" });
        }

        const updatedAlarm = await Alarm.findOneAndUpdate({ alarmTime, userid }, { $set: updateData }, { new: true }
        );

        if (updatedAlarm) {
            return res.status(200).json({ message: "Alarm updated successfully", data: updatedAlarm });
        } else {
            return res.status(200).json({ message: "Error updating the alarm" });
        }
    } catch (error) {
        res.status(500).json({
            message: `An error occurred while updating the alarm: ${error}`,
        });
    }
}

async function deleteAlarm(req, res) {
    const { userid, alarmTime } = req.body;
    try {
        const getAlarm = await Alarm.findOneAndDelete({ alarmTime, userid });
        if (getAlarm) {
            return res.status(200).json({ message: "User alarm deleted successfully", data: getAlarm });
        } else {
            return res.status(200).json({ message: "Alarm not found" });
        }
    } catch (error) {
        res.status(500).json({
            message: `An error occurred while deleting the alarm: ${error}`,
        });
    }
}


module.exports = { createAlarm, getUserAlarm, getAlarmByNameandUserId, updateAlarm, deleteAlarm };
