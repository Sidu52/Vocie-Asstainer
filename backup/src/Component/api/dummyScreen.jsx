import React, { useRef, useEffect, useContext } from "react";
import axios from "axios";
import { MyContext } from "../../Context/Mycontext";
import { speakText } from "../text_to_speack/speaktext";
import { takeInput } from "../../Screen/MainVoiceFuntion";
import Coin__toss_Sound from '../../assets/sound/Coin__toss__sound.mp3'
import Dice__Rolling_Sound from '../../assets/sound/Dice__Roll.mp3'
import { jokesData, Name, Hello, Bye, AboutYou, love_jarvis, hate_jarvis, SidhuAlston, Disturb, FamilyInfo, jarvise_work } from '../../data/jokeData'



export default function DummyScreen({ name, userInput }) {
    const { setListen, setSpeaking, setMicListen } = useContext(MyContext);
    const hasMounted = useRef(false);
    const VITE_Location_API_KEY = process.env.REACT_APP_Location_API_KEY;
    const regex = /\d+(\.\d+)?/g;
    useEffect(() => {
        if (!hasMounted.current) {
            // Only run the effect on the initial mount
            hasMounted.current = true;
            fetchData(name);
        }
    }, []);

    const fetchData = async (name) => {
        let data = [];
        switch (name) {
            case "jokesData":
                data = jokesData;
                break;
            case "name":
                data = Name;
                break;
            case "jarvise_work":
                data = jarvise_work;
                break;
            case "Hello":
                data = Hello;
                break;
            case "Bye":
                data = Bye;
                break;
            case "Aboutyou":
                data = AboutYou;
                break;
            case "love_jarvis":
                data = love_jarvis;
                break;
            case "hate_jarvis":
                data = hate_jarvis;
                break;
            case "SidhuAlston":
                data = SidhuAlston;
                break;
            case "disturb":
                data = Disturb;
                break;
            case "FamilyInfo":
                data = FamilyInfo;
                break;
            case "about_us":
                return aboutUs();
            case "Not_Category":
                setSpeaking(true);
                await speakText("Sorry, I don't know much more about that, but with time I am updating myself");
                setSpeaking(false);
                return setListen(true)
            case "Stop":
                setSpeaking(true);
                await speakText("Okk boss");
                setSpeaking(false);
                return setListen(true)
            case "date":
            case "time":
            case "weekday":
            case "currentMonth":
            case "currentYear":
                return getCurrentTimeAndDate(name);
            case "coinToss":
                return tossCoin("coinToss");
            case "rollDie":
                return rollDice("rollDie");
            case "translate":
                return translateTextToHindi()
            case "LoveCalculator":
                return getLovePercentage()
            case "sendSms":
            // return sendSMS();
            case "remain":
                return Remain(userInput)
            case "open_website":
                return openWeb()
            case "get_Location":
                const Location = await getUserLocation();
                console.log("object", Location)
                await speakText(`Your Location is ${Location?.locationName.split("-")[0]}`)
                return setListen(true)
            default:
                // Handle the case where an invalid name is provided.
                data = ["Invalid name provided."];
        }



        // Return a random item from the selected data array.
        const randomIndex = Math.floor(Math.random() * data.length);
        if (name === "Hello") {
            let greeting = ""
            const hour = new Date().getHours();
            // Greet based on the time of day
            if (hour >= 0 && hour < 12) {
                greeting = "Good Morning Boss...";
            } else if (hour >= 12 && hour < 17) {
                greeting = "Good Afternoon Boss...";
            } else {
                greeting = "Good Evening Sir...";
            }
            setSpeaking(true);
            await speakText(greeting + data[randomIndex]);
            setSpeaking(false);
            return setListen(true)
        }
        setSpeaking(true);
        await speakText(data[randomIndex]);
        setSpeaking(false);
        setListen(true)
    };

    //About Us
    const aboutUs = async () => {
        setSpeaking(true);
        await speakText("It is credential information.");
        await speakText("I have not authenticated for sharing my credential information with anyone.");
        await speakText("But I am created using mern technology React.js, Node.js, Express.js, and Mongoose for storing data for updating myself");
        setSpeaking(false);
        setListen(true)
    }

    //Date time weeak month year
    async function getCurrentTimeAndDate(type) {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1;
        const day = currentDate.getDate();
        const hours = currentDate.getHours();
        const minutes = currentDate.getMinutes();
        const seconds = currentDate.getSeconds();
        const amPm = hours >= 12 ? 'PM' : 'AM';
        const weekdayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const weekday = weekdayNames[currentDate.getDay()];
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const monthName = monthNames[month - 1];

        // Format the date as "YYYY-MM-DD" and time as "HH:MM:SS"
        const dateFormat = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const timeFormat = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')} ${amPm}`;
        if (type === "date") {
            setSpeaking(true);
            await speakText(`Ah, today's date is ${dateFormat}. Time flies, doesn't it?`);
            setSpeaking(false);
            return setListen(true);
        } else if (type === "time") {
            setSpeaking(true);
            await speakText(`Tick-tock! The current time is ${timeFormat}. Make every moment count!`);
            setSpeaking(false);
            return setListen(true);
        } else if (type === "weekday") {
            setSpeaking(true);
            await speakText(`Guess what? It's a fantastic ${weekday}! Embrace the day with a smile.`);
            setSpeaking(false);
            return setListen(true);
        } else if (type === "currentMonth") {
            setSpeaking(true);
            await speakText(`Welcome to the wonderful month of ${monthName}! New adventures await.`);
            setSpeaking(false);
            return setListen(true);
        } else if (type === "currentYear") {
            setSpeaking(true);
            await speakText(`We're cruising through ${year}! Make it a year to remember.`);
            setSpeaking(false);
            return setListen(true);
        } else {
            setSpeaking(true);
            await speakText(`Oops! Looks like you've entered an invalid type. Let's try something else.`);
            setSpeaking(false);
            return setListen(true);
        }

    }

    //Roll a dise and toss a coin
    const playCoinTossSound = (value) => {
        return new Promise((resolve, reject) => {
            const audio = new Audio(value === "coinToss" ? Coin__toss_Sound : Dice__Rolling_Sound);

            audio.addEventListener('ended', () => {
                resolve(true);
            });

            audio.addEventListener('error', (error) => {
                reject(error);
            });

            audio.play();
        });
    };


    const tossCoin = async (value) => {
        try {
            setSpeaking(true);
            await speakText("I'm tossing a coin.");
            setSpeaking(false);
            const result = Math.random() < 0.5 ? 'Heads' : 'Tails';

            await playCoinTossSound(value);
            setSpeaking(true);
            await speakText("Would you like to know the result?");
            setSpeaking(false);
            setMicListen(true)
            let formData = await takeInput();
            setMicListen(false)
            let attempts = 0;
            while (!formData && attempts < 2) {
                setSpeaking(true);
                await speakText("Sorry, I didn't catch that. Could you please try again?");
                setSpeaking(false);
                attempts++;
                setMicListen(true)
                formData = await takeInput();
                setMicListen(false)

            }

            if (attempts === 2) {
                setSpeaking(true);
                await speakText("Sorry, I couldn't understand. Thanks for using!");
                setSpeaking(false);
                return setListen(true);
            }

            if (formData.includes("yes") && !formData.includes("no")) {
                setSpeaking(true);
                await speakText(`The result is ${result}.`);
                setSpeaking(false);
                return setListen(true);
            } else {
                setSpeaking(true);
                await speakText("Alright, thanks for using!");
                setSpeaking(false);
                return setListen(true);
            }
        } catch (error) {
            console.error("Error in tossCoin:", error);
            setSpeaking(true);
            await speakText("Oops! Something went wrong. Please try again.");
            setSpeaking(false);
            return setListen(true);
        }
    };

    const rollDice = async (value) => {
        try {
            setSpeaking(true);
            await speakText("I'm rolling a dice.");
            setSpeaking(false);
            const result = Math.floor(Math.random() * 6) + 1;

            await playCoinTossSound(value);
            setSpeaking(true);
            await speakText("Would you like to know the result?");
            setSpeaking(false);
            setMicListen(true)
            let formData = await takeInput();
            setMicListen(false)


            let attempts = 0;
            while (!formData && attempts < 2) {
                setSpeaking(true);
                await speakText("Sorry, I didn't catch that. Could you please try again?");
                setSpeaking(false);
                attempts++;
                setMicListen(true)
                formData = await takeInput();
                setMicListen(false)

            }

            if (attempts === 2) {
                setSpeaking(true);
                await speakText("Sorry, I couldn't understand. Thanks for using!");
                setSpeaking(false);
                return setListen(true);
            }

            if (formData.includes("yes") && !formData.includes("no")) {
                setSpeaking(true);
                await speakText(`The dice shows the number ${result}.`);
                setSpeaking(false);
                return setListen(true);
            } else {
                setSpeaking(true);
                await speakText("Alright, thanks for using!");
                setSpeaking(false);
                return setListen(true);
            }
        } catch (error) {
            console.error("Error in rollDice:", error);
            setSpeaking(true);
            await speakText("Oops! Something went wrong. Please try again.");
            setSpeaking(false);
            return setListen(true);
        }
    };

    async function openWeb() {
        await speakText("okay")
        return setListen(true);
    }



    //Get Locaton
    async function getUserLocation() {
        return new Promise(async (resolve, reject) => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    async (position) => {
                        const userLocation = {
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                        };

                        try {
                            const locationName = await getLocationName(userLocation.latitude, userLocation.longitude);
                            userLocation.locationName = locationName;
                            resolve(userLocation);
                        } catch (error) {
                            reject(`Error getting location name: ${error.message}`);
                        }
                    },
                    (error) => {
                        reject(`Error getting user location: ${error.message}`);
                    }
                );
            } else {
                reject('Geolocation is not supported by this browser.');
            }
        });
    }

    async function getLocationName(latitude, longitude) {
        try {
            const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json?key=${"80f15158956343a5b8fc36350e8ecae4"}&q=${latitude}+${longitude}&pretty=1`);

            const results = response.data.results;

            if (results.length > 0) {
                const locationName = results[0].formatted;
                return locationName;
            } else {
                setSpeaking(true)
                await speakText('Location not found.');
                setSpeaking(false)
                return setListen(true)
            }
        } catch (error) {
            return setListen(true)
        }
    }

    //Translater
    const transl = async (sentence, from, to) => {
        const encodedParams = new URLSearchParams();
        encodedParams.set('q', sentence);
        encodedParams.set('source', from); // Source language is English
        encodedParams.set('target', to); // Target language is Hindi
        try {
            const { data } = await axios.post("https://google-translate1.p.rapidapi.com/language/translate/v2", encodedParams, {
                headers: {
                    'content-type': 'application/x-www-form-urlencoded',
                    'Accept-Encoding': 'application/gzip',
                    'X-RapidAPI-Key': process.env.REACT_APP_Rapid_API_KEY,
                    'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
                },
            });
            setSpeaking(true);
            await speakText(data.data.translations[0].translatedText, to);//IT is not working speakText only speak endlishS
            setSpeaking(false);
            return setListen(true)
        } catch (error) {
            console.error("Translation error:", error);
            setSpeaking(true);
            await speakText("Somting Wrong with me try again")
            setSpeaking(false);
            return setListen(true)
        }
    };

    const translateTextToHindi = async () => {
        try {
            let i = 0;
            setSpeaking(true);
            await speakText("Alright, let's get started with translation. Please speak your first language.");
            setSpeaking(false);
            const { data } = await axios.get("https://pkgstore.datahub.io/core/language-codes/language-codes_json/data/97607046542b532c395cf83df5185246/language-codes_json.json");
            setMicListen(true)
            let From = await takeInput();
            setMicListen(false)
            i = 0;
            while (!From && i < 5) {
                setSpeaking(true);
                await speakText("Sorry, I didn't catch that. Could you please tell me your first language again?");
                setSpeaking(false);
                i++
                setMicListen(true)
                From = await takeInput();
                setMicListen(false)
            }
            if (i == 5) {
                setSpeaking(true);
                await speakText("Sorry, I couldn't understand. Thank you for using the translation service.");
                setSpeaking(false);
                return setListen(true)
            }
            const FromLanguage = (data.find(language => language.English === From));
            setSpeaking(true);
            await speakText(`Great! Your first language is ${From}.`);
            await speakText("Now, please speak your target language.");
            setSpeaking(false);
            setMicListen(true)
            let target = await takeInput();
            setMicListen(false)
            i = 0;
            while (!target && i < 5) {
                setSpeaking(true);
                await speakText("Sorry, I didn't catch that. Could you please tell me your target language again?");
                setSpeaking(false);
                setMicListen(true)
                target = await takeInput();
                setMicListen(false)
            }
            if (i == 5) {
                setSpeaking(true);
                await speakText("Sorry, I couldn't understand. Thank you for using the translation service.");
                setSpeaking(false);
                return setListen(true)
            }
            const targetLanguage = (data.find(language => language.English === target));
            setSpeaking(true);
            await speakText(`Perfect! Your target language is ${target}`);
            await speakText("Lastly, please speak the sentence or word that you want to translate.");
            setSpeaking(false);
            setMicListen(true)
            let sentence = await takeInput();
            setMicListen(false)
            i = 0;
            while (!sentence && i < 5) {
                setSpeaking(true);
                await speakText("Sorry, I didn't catch that. Could you please repeat the sentence or word?");
                setSpeaking(false);
                i++
                setMicListen(true)
                sentence = await takeInput();
                setMicListen(false)
            }
            if (i == 5) {
                setSpeaking(true);
                await speakText("Sorry, I couldn't understand. Thank you for using the translation service.");
                setSpeaking(false);
                return setListen(true)
            }
            return transl(sentence, FromLanguage.alpha2, targetLanguage.alpha2);
        }
        catch (err) {
            console.error("Error:", err);
            setSpeaking(true);
            await speakText("Oops! Something went wrong. Please try again.");
            setSpeaking(false);
            return setListen(true)
        }
    }



    // //CurrencyConversion
    // async function getCurrencyConversion() {
    //     const options = {
    //         method: 'GET',
    //         url: 'https://currencyconverter.p.rapidapi.com/',
    //         params: {
    //             from_amount: '1',
    //             from: 'USD',
    //             to: 'SEK'
    //         },
    //         headers: {
    //             'X-RapidAPI-Key': VITE_API_KEY,
    //             'X-RapidAPI-Host': 'currencyconverter.p.rapidapi.com'
    //         }
    //     };

    //     try {
    //         const response = await axios.request(options);
    //         console.log(response.data);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }

    async function Remain(input) {
        try {
            console.log("1");

            const RemainValue = localStorage.getItem("remain");
            const regex = /\d+/; // Add the regex for extracting numbers

            if (!RemainValue &&
                input?.toLowerCase()?.includes("remain") &&
                input?.toLowerCase()?.includes("number") &&
                !input?.toLowerCase()?.includes(["word", "sentence", "paragraph"])
            ) {
                console.log("2");
                const Number = input.match(regex);
                if (Number) {
                    localStorage.setItem("remain", Number[0]);
                    setSpeaking(true);
                    await speakText(`Okay, number ${Number[0]} remain`);
                    setSpeaking(false);
                    return setListen(true);
                }
            } else if (
                !RemainValue &&
                input?.toLowerCase()?.includes("remain") &&
                input?.toLowerCase()?.includes(["word", "sentence", "paragraph"])
            ) {
                console.log("3");
                const str = input.split("remain");
                console.log("STR", str);
            } else {
                console.log("4", input);
                setSpeaking(true);
                await speakText(`I remain at ${RemainValue}`);
                setSpeaking(false);
                return setListen(true);
            }
        } catch (error) {
            console.error("Error:", error);
            setSpeaking(true);
            await speakText("Oops! Something went wrong. Please try again.");
            setSpeaking(false);
            localStorage.removeItem("remain");
            return setListen(true);
        }
    }


    async function getLovePercentage() {
        try {
            setSpeaking(true);
            await speakText("Hello there! Could you please tell me your name?");
            setSpeaking(false);
            setMicListen(true)
            let yourName = await takeInput();
            setMicListen(false)
            let attempts = 0;
            while (!yourName && attempts < 5) {
                setSpeaking(true);
                await speakText("Oops, I didn't catch your name. Please try again.");
                setSpeaking(false);
                attempts++;
                setMicListen(true)
                yourName = await takeInput();
                setMicListen(false)
            }

            if (attempts === 5) {
                setSpeaking(true);
                await speakText("Sorry, I couldn't understand your name. Thanks for using the love calculator!");
                setSpeaking(false);
                return setListen(true);
            }

            setSpeaking(true);
            await speakText(`Great, ${yourName}! Now, can you tell me the name of your partner?`);
            setSpeaking(false);
            setMicListen(true)
            let partnerName = await takeInput();
            setMicListen(false)
            attempts = 0;

            while (!partnerName && attempts < 5) {
                setSpeaking(true);
                await speakText("Oops, I didn't catch your partner's name. Please try again.");
                setSpeaking(false);
                attempts++;
                setMicListen(true)
                partnerName = await takeInput();
                setMicListen(false)
            }

            setSpeaking(true);
            if (attempts === 5) {
                await speakText("Sorry, I couldn't understand your partner's name. Thanks for using the love calculator!");
                setSpeaking(false);
                return setListen(true);
            }

            const options = {
                method: 'GET',
                url: 'https://love-calculator.p.rapidapi.com/getPercentage',
                params: {
                    sname: yourName,
                    fname: partnerName
                },
                headers: {
                    'X-RapidAPI-Key': '5447f97097msh074e382b719e1cap1bdf77jsn70dc0acb5746',
                    'X-RapidAPI-Host': 'love-calculator.p.rapidapi.com'
                }
            };

            const response = await axios.request(options);
            const lovePercentage = response.data.percentage;

            setSpeaking(true);
            await speakText(`The love percentage between ${yourName} and ${partnerName} is ${lovePercentage}%.`);
            setSpeaking(false);
            return setListen(true);
        } catch (error) {
            console.error("Error:", error);
            setSpeaking(true);
            await speakText("Oops! Something went wrong with the love calculator. Please try again.");
            setSpeaking(false);
            return setListen(true);
        }
    }


    return (
        <div>
        </div>
    )
}
