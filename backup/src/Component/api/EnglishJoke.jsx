import React, { useEffect, useContext, useRef } from "react";
import { jokesData } from '../../data/jokeData'
import { MyContext } from "../../Context/Mycontext";
import axios from 'axios'
import { speakText } from "../text_to_speack/speaktext";
import { takeInput } from "../../Screen/MainVoiceFuntion";

const VITE_EnglishJoke_API_KEY = process.env.REACT_APP_Rapid_API_KEY

export default function EnglishJoke({ name }) {
    const { setListen, setSpeaking, setMicListen } = useContext(MyContext);
    const hasMounted = useRef(false);

    useEffect(() => {
        if (!hasMounted.current) {
            hasMounted.current = true;
            if (name === "english_joke") {
                tellJoke();
            } else {
                handleHindiJoke()
            }

        }
    }, []);


    async function tellJoke() {
        try {
            const { data } = await axios.get("https://dad-jokes.p.rapidapi.com/random/joke", {
                headers: {
                    'X-RapidAPI-Key': VITE_EnglishJoke_API_KEY,
                    'X-RapidAPI-Host': 'dad-jokes.p.rapidapi.com'
                }
            });
            if (data) {
                setSpeaking(true);
                await speakText(data.body[0].setup);
                await speakText(data.body[0].punchline);
                setSpeaking(false);
                return setListen(true)
            }
            const randomIndex = Math.floor(Math.random() * data.length);
            setSpeaking(true);
            await speakText(jokesData[randomIndex]);
            setSpeaking(false);
            return setListen(true)
        } catch (error) {
            console.error(error);
            setSpeaking(true);
            await speakText("Somting Wrong with me try again")
            setSpeaking(false);
            return setListen(true)
        }
    }

    async function handleHindiJoke() {
        setSpeaking(true);
        await speakText("ओके", "HI");
        setSpeaking(false);
        try {
            const { data } = await axios.get('https://hindi-jokes-api.onrender.com/jokes?api_key=bd4c780c41c74b6af4ae1f31bc5d');
            if (data) {
                const str = data.jokeContent.replace(/[\u{1F600}-\u{1F64F}]/gu, '') // Emoticons
                    .replace(/[\u{1F300}-\u{1F5FF}]/gu, '') // Miscellaneous Symbols and Pictographs
                    .replace(/[\u{1F680}-\u{1F6FF}]/gu, '') // Transport and Map Symbols
                    .replace(/[\u{2600}-\u{26FF}]/gu, '')   // Miscellaneous Symbols
                    .replace(/[\u{2700}-\u{27BF}]/gu, '')   // Dingbat Symbols
                    .replace(/[\u{1F600}-\u{1F64F}]/gu, ''); // Additional range for Rome Open Mouth emoji
                setSpeaking(true);
                await speakText(str, "HI");
                await speakText("क्या आप और चुटकुले सुनना चाओगे |", "HI");
                setSpeaking(false);
                setMicListen(true)
                const input = await takeInput();
                setMicListen(false)
                if (input && input.toLowerCase().includes("joke") || input.toLowerCase().includes("yes") || input.toLowerCase().includes("another") || input.toLowerCase().includes("han")) {
                    return handleHindiJoke();
                }
                await speakText("Sorry input not found try again later")
                return setListen(true)

            }
        } catch (err) {
            setSpeaking(true);
            await speakText("Somting Wrong with me try again")
            setSpeaking(false);
            return setListen(true)
        }
    }
    return (
        <div>
        </div>
    )
}
