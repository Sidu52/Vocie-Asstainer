const os = require('os');
const twilio = require("twilio")
const { exec } = require('child_process');
const StringModel = require('../model/stringSchema');
const uniqueStr = require('../model/uniqeString');
const compromise = require('compromise');
// const cmd = require('../comands/comands'); // Make sure this path is correct
const { NlpManager } = require('node-nlp');
const manager = new NlpManager({ languages: ['en'], forceNER: true });

// // Map over the imported `cmd` array to add documents
// cmd.map((item) => {
//     item.utterance.map((data) => {
//         console.log(data)
//         manager.addDocument('en', data, item.function);
//     })
// });

// // Add responses answer
// manager.addAnswer('en', 'greetings.hello', 'Hello');
// manager.addAnswer('en', 'greeting.aboutyou', 'Aboutyou');
// manager.addAnswer('en', 'greeting.wiss', 'wiss');
// manager.addAnswer('en', 'greetings.bye', 'Bye');
// manager.addAnswer('en', 'love_jarvis', 'love_jarvis');
// manager.addAnswer('en', 'hate_jarvis', 'hate_jarvis');
// manager.addAnswer('en', 'disturb', 'disturb');

// manager.addAnswer('en', 'weather', 'City_Weather');
// manager.addAnswer('en', 'country', 'country');
// manager.addAnswer('en', 'country_capital', 'country_capital');
// manager.addAnswer('en', 'country_population', 'country_population');
// manager.addAnswer('en', 'state', 'state');
// manager.addAnswer('en', 'city', 'city');
// manager.addAnswer('en', 'speak_joke', 'speak_joke');
// manager.addAnswer('en', 'family_info', 'family_info');
// manager.addAnswer('en', 'music_play', 'music_play');
// manager.addAnswer('en', 'youtube_music', 'play_youtube');
// manager.addAnswer('en', 'open_website', 'open_website');
// manager.addAnswer('en', 'translate', 'translate');
// manager.addAnswer('en', 'english_joke', 'english_joke');
// manager.addAnswer('en', 'hindi_joke', 'hindi_joke');
// manager.addAnswer('en', 'weather_forecast', 'weather_forecast');
// manager.addAnswer('en', 'date', 'date');
// manager.addAnswer('en', 'time', 'time');
// manager.addAnswer('en', 'wikipidia', 'wikipidia');
// manager.addAnswer('en', 'about_us', 'about_us');
// manager.addAnswer('en', 'gkquize', 'gkquize');
// manager.addAnswer('en', 'SidhuAlston', 'SidhuAlston');
// manager.addAnswer('en', 'create_todolsit', 'create_todolsit');
// manager.addAnswer('en', 'update_todolsit', 'update_todolsit');
// manager.addAnswer('en', 'delete_todolsit', 'delete_todolsit');
// manager.addAnswer('en', 'get_todolsit', 'get_todolsit');
// manager.addAnswer('en', 'getAll_todolsit', 'getAll_todolsit');
// manager.addAnswer('en', 'Stop', 'Stop');
// manager.addAnswer('en', 'jarvise_work', 'jarvise_work');
// manager.addAnswer('en', 'set Alarm', 'set Alarm');
// manager.addAnswer('en', 'update Alarm', 'update Alarm');
// manager.addAnswer('en', 'delete Alarm', 'delete Alarm');
// manager.addAnswer('en', 'get Alarm', 'get Alarm');
// manager.addAnswer('en', 'getAll Alarm', 'getAll Alarm');
// manager.addAnswer('en', 'name', 'name');
// manager.addAnswer('en', 'weekday', 'weekday');
// manager.addAnswer('en', 'currentMonth', 'currentMonth');
// manager.addAnswer('en', 'currentYear', 'currentYear');
// manager.addAnswer('en', 'tellStory', 'story');
// manager.addAnswer('en', 'coinToss', 'coinToss');
// manager.addAnswer('en', 'rollDie', 'rollDie');
// manager.addAnswer('en', 'solarSytem', 'solarSytem');
// manager.addAnswer('en', 'LoveCalculator', 'LoveCalculator');
// manager.addAnswer('en', 'sendSms', 'sendSms');
// manager.addAnswer('en', 'remain', 'remain');
// manager.addAnswer('en', 'get_Location', 'get_Location');

(async () => {
    await manager.load();
    // await manager.train();
    // manager.save();
})();

async function findfunction(req, res) {
    try {
        const userInput = req.body.userInput;
        const doc = compromise(userInput);
        // Extract the intent (action)  
        const intent = doc.verbs().out('array')[0];
        // Extract the entity (what to open)
        const entity = doc.nouns().out('array')[0];
        const webname = await executeCommand(intent, entity)
        // Process the user input using the NLP model
        const data = await manager.process('en', userInput.toLowerCase())

        if (!data.answer) {
            saveUniqueString(userInput);
        } else {
            saveStringToDatabase(userInput, data.answer);
        }
        if (data.answer === "open_website") {
            await openSoftware(userInput);
        }
        return res.status(200).json({ message: 'find data sucessfull', data: data.answer || "Not_Category", noun: entity });
        // return res.status(200).json({ message: 'find data sucessfull', data });
    }
    catch (error) {
        res.status(500).json({ message: 'An error occurred while processing the request.', error });
    }
}


const accountSid = 'ACf47e7e8eed3933983cb669fc58644e3f';
const authToken = '817026df29d3d591e3fd1f01ad5988be';
const client = require('twilio')(accountSid, authToken);

// SendMessage
async function sendSMS(to, message) {
    try {
        // Send SMS
        const result = await client.messages.create({
            body: 'hy this side sidhu alston',
            from: '+17083152514',
            to: '+918085984844'
        })

        console.log(result.sid);
        return res.status(200).json({ message: 'message send successful' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'message not send successful', error: error });
    }
}


async function executeCommand(intent, entity) {
    if (intent === 'open' && entity) {
        const softwareCommands = {
            skype: 'start skype',//Skype
            notepad: 'start notepad.exe',//notepad
            chrome: 'start chrome',//chrome
            edge: 'start msedge',//edge
            calculator: 'start calc',//calculator
            camera: 'start microsoft.windows.camera:',// camera
            alarms: 'start ms-clock:',//Clock
            mail: 'start outlook', // Mail
            filemanager: 'start explorer', // File manager
            word: 'start winword', // Microsoft Word
            excel: 'start excel', // Microsoft Excel
            powerpoint: 'start powerpnt', //Microsoft PowerPoint
            vlc: 'start vlc', // VLC media player
            photoshop: 'start photoshop', // Adobe Photoshop
            acrobat: 'start acrobat', // Adobe Acrobat Reader
            vscode: 'start code', //Visual Studio Code
            terminal: 'start cmd', //command prompt
            cmd: 'start cmd', //command prompt
        };
        const softwareCommand = softwareCommands[entity.toLowerCase()];

        return softwareCommand;
    }
}


async function openSoftware(command) {
    const platform = os.platform();
    let softwareCommand = ""; // Corrected: Removed const since it's being reassigned

    switch (platform) {
        case 'win32':
        case 'win64':
            if (command?.toLowerCase()?.includes("notepad")) {
                softwareCommand = `start notepad.exe`;
            } else if (command?.toLowerCase()?.includes("camera")) {
                softwareCommand = `start camera.exe`;
            } else if (command?.toLowerCase()?.includes("chrome")) {
                softwareCommand = `start chrome.exe`;
            } else if (command?.toLowerCase()?.includes("skype")) {
                softwareCommand = `start skype.exe`;
            } else if (command?.toLowerCase()?.includes("brave")) {
                softwareCommand = `start brave.exe`;
            } else if (command?.toLowerCase()?.includes("file explorer")) {
                softwareCommand = `start explorer.exe`;
            } else if (command?.toLowerCase()?.includes("vscode") || command?.toLowerCase()?.includes("visual studio code")) {
                softwareCommand = `code`;
            } else if (command?.toLowerCase()?.includes("email")) {
                softwareCommand = `start outlook.exe`;
            } else if (command?.toLowerCase()?.includes("copilot")) {
                softwareCommand = `start copilot.exe`; // Update with the actual command for Copilot
            } else if (command?.toLowerCase()?.includes("calculator")) {
                softwareCommand = `start calc.exe`;
            } else if (command?.toLowerCase()?.includes("word") || command?.toLowerCase()?.includes("ms word")) {
                softwareCommand = `start winword.exe`;
            } else if (command?.toLowerCase()?.includes("excel")) {
                softwareCommand = `start excel.exe`;
            } else if (command?.toLowerCase()?.includes("powerpoint")) {
                softwareCommand = `start powerpnt.exe`;
            } else if (command?.toLowerCase()?.includes("settings")) {
                softwareCommand = `start ms-settings:`;
            } else if (command?.toLowerCase()?.includes("spotify")) {
                softwareCommand = `start spotify.exe`;
            } else if (command?.toLowerCase()?.includes("clock")) {
                softwareCommand = `start ms-clock:`;
            } else if (command?.toLowerCase()?.includes("media player")) {
                softwareCommand = `start wmplayer.exe`;
            } else if (command?.toLowerCase()?.includes("photo")) {
                softwareCommand = `start microsoft.windows.photos:`;
            } else if (command?.toLowerCase()?.includes("paint")) {
                softwareCommand = `start mspaint.exe`;
            } else if (command?.toLowerCase()?.includes("sound recorder")) {
                softwareCommand = `start sndrec32.exe`;
            } else {
                console.error(`Unsupported software: ${command}`);
                return;
            }

            exec(softwareCommand, (error) => {
                if (error) {
                    console.error(`Error: ${error}`);
                }
            });
            break;

        case 'linux':
        case 'darwin':
            const shellCommand = command; // Corrected: Removed unnecessary line
            exec(shellCommand, (error) => {
                if (error) {
                    console.error(`Error: ${error}`);
                }
            });
            break;

        case 'android':
            const adbCommand = `adb shell ${command}`;
            exec(adbCommand, (error) => {
                if (error) {
                    console.error(`Error: ${error}`);
                }
            });
            break;

        default:
            console.error('Unsupported operating system:', platform);
            break;
    }
}

// Example usage:
// openSoftware('notepad');
// openSoftware('chrome');
// openSoftware('file explorer');

// async function openSoftware(command) {
//     const platform = os.platform();
//     const softwareCommand = ""
//     switch (platform) {

//         case 'win32':
//         case 'win64':
//             if (command?.toLowerCase()?.includes("notepad")) {
//                 softwareCommand = `start notepad.exe`;
//             } else if (command?.toLowerCase()?.includes("camera")) {
//                 softwareCommand = `start camera.exe`;
//             } else if (command?.toLowerCase()?.includes("chrome")) {
//                 softwareCommand = `start chrome.exe`;
//             } else if (command?.toLowerCase()?.includes("skype")) {
//                 softwareCommand = `start skype.exe`;
//             } else if (command?.toLowerCase()?.includes("brave")) {
//                 softwareCommand = `start brave.exe`;
//             } else if (command?.toLowerCase()?.includes("fiel exploser")) {
//                 softwareCommand = `start fileexploser.exe`;
//             }
//             const softwareCommand =
//                 // const softwareCommand = `start "" "C:\\Program Files\\${command}\\${command}.exe"`;
//                 exec(softwareCommand, (error) => {
//                     if (error) {
//                         console.error(`Error: ${error}`);
//                     }
//                 });
//             break;
//         case 'linux':
//         case 'darwin':
//             const shellCommand = command;
//             exec(shellCommand, (error) => {
//                 if (error) {
//                     console.error(`Error: ${error}`);
//                 }
//             });
//             break;
//         case 'android':
//             const adbCommand = `adb shell ${command}`;
//             exec(adbCommand, (error) => {
//                 if (error) {
//                     console.error(`Error: ${error}`);
//                 }
//             });
//             break;
//         default:
//             console.error('Unsupported operating system:', platform);
//             break;
//     }
// }

async function saveStringToDatabase(inputString, category) {
    try {
        // Check if the inputString already exists in the database
        const existingString = await StringModel.findOne({ content: inputString });
        if (existingString) {
        } else {
            const newString = new StringModel({
                content: inputString,
                category: category,
            });
            await newString.save();
        }
    } catch (error) {
        console.error('Error saving string to the database:', error);
    }
}
// Function to save a unique string to the database
async function saveUniqueString(inputString) {
    try {
        // Check if the inputString already exists in the database
        const existingString = await uniqueStr.findOne({ content: inputString });
        if (existingString) {
        } else {
            const newString = new uniqueStr({ content: inputString });
            await newString.save();
        }
    } catch (error) {
        console.error('Error saving UniqueString to the database:', error);
    }
}

module.exports = { findfunction, sendSMS }
