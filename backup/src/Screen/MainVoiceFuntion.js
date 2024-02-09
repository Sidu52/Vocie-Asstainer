import { speakText } from "../Component/text_to_speack/speaktext";
import axios from "axios";
import { URL } from "../endpointURL";
import Music from "../Component/api/Music";
import CountryStateCity from "../Component/api/CountryStateCity";
import WikipidiaData from "../Component/api/WikipidiaData";
import SetAlaram from "../Component/api/SetAlaram";
//Import All Apis
import Todos from '../Component/api/Todo'
import SolarSystem from "../Component/api/SolarSystem";
import Game from '../Component/api/Game'
import DummyScreen from "../Component/api/dummyScreen";
import EnglishJoke from "../Component/api/EnglishJoke";
import ShortStory from '../Component/api/ShortStory';


const startListening = (value) => {
    if (value === "jarvis") {
        return true;
    }
    return new Promise((resolve, reject) => {
        let recognitionInstance = new window.webkitSpeechRecognition();
        recognitionInstance.continuous = true;
        recognitionInstance.lang = "en-US";

        recognitionInstance.onstart = () => {
        };
        recognitionInstance.onresult = (event) => {
            const transcript = value || event.results[event.results.length - 1][0].transcript.toLowerCase();
            console.log("ss", transcript)
            if (transcript.includes("jarvis")) {
                // if (transcript?.toLowerCase().includes("hi buddy")) {
                recognitionInstance.stop();
                resolve(true);
            }
        };
        recognitionInstance.onerror = (error) => {
            console.error("Speech recognition error: ", error);
            recognitionInstance.stop();
            startListening();
        };
        recognitionInstance.onend = () => {
        };
        recognitionInstance.start();
    });
};

const takeInput = () => {
    return new Promise((resolve, reject) => {
        const recognition = new window.webkitSpeechRecognition();
        recognition.onresult = (event) => {
            const output = event.results[0][0].transcript;
            recognition.stop();
            resolve(output);
        };
        recognition.onerror = (error) => {
            // reject(error);
            takeInput()
        };
        recognition.onend = () => {
            resolve("");
        };
        recognition.start();
    });
};

const stopCmd = async () => {
    const stopcommand = [
        "stop jarvis",
        "stop Jarvis",
        "jarvis stop",
        'music stop',
        'close music',
        'stop'
    ];
    const Input = await takeInput();
    console.log("INput data", takeInput)
    if (stopcommand.some(cmd => Input?.toLowerCase()?.includes(cmd.toLowerCase()))) {
        return true
    } else {
        stopCmd();
    }
}

//Find Category
const find = async (userInput) => {
    try {
        const { data } = await axios.post(`${URL}/findfunction`, { userInput });

        switch (data.data) {
            case "Hello":
            case "name":
            case "Bye":
            case "disturb":
            case "jarvise_work":
            case "Aboutyou":
            case "love_jarvis":
            case "hate_jarvis":
            case "SidhuAlston":
            case "family_info":
            case "about_us":
            case "Not_Category":
            case "Stop":
            //Date time
            case "date":
            case "time":
            case "weekday":
            case "currentMonth":
            case "currentYear":
            //Toss a coin and roll a dise
            case "coinToss":
            case "rollDie":
            //Translate
            case "translate":
            //Love Paercentage
            case "LoveCalculator":
            case "sendSms":
            //Remain 
            case "remain":
                return <DummyScreen name={data.data} userInput={userInput} />
            case "solarSytem":
                return <SolarSystem userInput={userInput} />
            case "story":
                return <ShortStory />
            case "english_joke":
            case "hindi_joke":
                return <EnglishJoke name={data.data} />
            case "gkquize":
                return <Game userInput={userInput} />
            case "create_todolsit":
            case "update_todolsit":
            case "delete_todolsit":
            case "getAll_todolsit":
            case "get_todolsit":
                return <Todos type={data.data} />
            case "play_youtube":
                return <Music userInput={userInput} />
            case "wikipidia":
                return <WikipidiaData input={userInput} />
            case "country":
            case "state":
            case "city":
            case "country_capital":
            case "country_population":
            case "City_Weather":
            case "weather_forecast":
                return < CountryStateCity
                    category={data.data}
                    userInput={userInput}
                />
            case "set Alarm":
            case "update Alarm":
            case "delete Alarm":
            case "getAll Alarm":
            case "get Alarm":
                return <SetAlaram userInput={userInput} opration={data.data} />
            case "mapNavigation":
                // await mapNavigate(animationupdate, loadingupdate);
                await speakText("Apologies, Boss. I'm currently working on enhancing this feature, but it's not complete yet.");
                break;

            default:
                await speakText("I'm continually learning and updating my capabilities. If there's something specific you'd like to know or do, feel free to ask, and I'll do my best to assist you.");
                break;

        }
        return null;
    } catch (err) {
        console.log(err)
        await speakText("Somting Wrong with me try again");

    }
};

export { startListening, takeInput, find, stopCmd }