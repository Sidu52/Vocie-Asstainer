import axios from "axios";
import { Country, State, City } from 'country-state-city';
import { speakText } from "../text_to_speack/speaktext";



const takeInput = () => {
    return new Promise((resolve, reject) => {
        const recognition = new webkitSpeechRecognition();
        recognition.onresult = (event) => {
            const output = event.results[0][0].transcript;
            resolve(output); // Resolve the promise with the recognized text
        };
        recognition.onerror = (error) => {
            reject(error); // Reject the promise in case of an error
        };
        recognition.onend = () => {
            // If onresult is not called before onend, consider it an error
            reject("Speech recognition ended without result.");
        };
        recognition.start();
    });
};

const mapNavigate = async (animationupdate, loadingupdate) => {
    try {
        let Fromlat = 0
        let Fromlon = 0
        let tolat = 0
        let tolon = 0
        await speakText("I think you want to use map navigation tell me your first destination")
        animationupdate(true);
        let From = await takeInput();
        if (!From) {
            return await speakText("Sorry try again");
        }
        animationupdate(false);
        if (From) {
            let data = Country.getAllCountries().find(c => c.name === From);
            if (!data) {
                data = State.getAllStates().find(c => c.name === From);
            }
            if (!data) {
                data = City.getAllCities().find(c => c.name === From);
            }
            if (!data) {
                return await speakText(`${From} is not a destination`);
            }
            console.log("qqqq", data)
            Fromlat = data.latitude;
            Fromlon = data.longitude;
        }
        await speakText(`Your first destiation is ${From}`);
        await speakText(`Please speak another destination.`);
        animationupdate(true);
        let to = await takeInput();
        if (!to) {
            await speakText("Sorry try again");
        }
        animationupdate(false);
        if (to) {
            let data = Country.getAllCountries().find(c => c.name === to);
            if (!data) {
                data = State.getAllStates().find(c => c.name === to);
            }
            if (!data) {
                data = City.getAllCities().find(c => c.name === to);
            }
            if (!data) {
                return await speakText(`${to} is not a destination`);
            }
            console.log("qqqq", data)
            tolat = data.latitude;
            tolon = data.longitude;
        }

        const { data } = await axios.get(`https://fast-routing.p.rapidapi.com/route/v1/driving/${Fromlon},${Fromlat};${tolon},${tolat}`, {
            params: {
                steps: true, // Get turn-by-turn directions
                overview: 'full', // Show full map navigation
                // You can include other optional parameters here, such as radiuses, bearings, approaches, exclude, etc.
            },
            headers: {
                'X-RapidAPI-Key': process.env.REACT_APP_Rapid_API_KEY,
                'X-RapidAPI-Host': 'fast-routing.p.rapidapi.com'
            }
        });
        if (data) {
            return console.log('Distance between Delhi and Mumbai:', data);
        }
        animationupdate(true);
        animationupdate(false);
        await speakText(`Your first language is ${From}`);
        await speakText(`Please speak target language.`);
        animationupdate(true);
        let target = await takeInput();
        const targetLanguage = (data.find(language => language.English === target));
        animationupdate(false);
        await speakText(`Your target language is ${target}`);
        loadingupdate(true);
        if (!targetLanguage) {
            return await speakText("Target language not found.");
        }
        loadingupdate(false);
        animationupdate(false);
        await speakText("Please speak the sentence or word that you want to translate.");
        animationupdate(true);
        let sentence = await takeInput();
        if (sentence) {
            animationupdate(false);
            return transl(sentence, FromLanguage.alpha2, targetLanguage.alpha2);
        }
        animationupdate(false);
    }
    catch (err) {
        console.error("Error:", err);
        return await speakText("Somting Wrong with me try again")
    }
}


export default mapNavigate;


