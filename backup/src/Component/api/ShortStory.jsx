
import { useEffect, useState, useRef, useContext } from "react";
import axios from "axios"
import { MyContext } from "../../Context/Mycontext";
import { speakText } from "../text_to_speack/speaktext";
import { stopCmd } from "../../Screen/MainVoiceFuntion";

export default function ShortStory() {
    const { setListen, setSpeaking } = useContext(MyContext);
    const [story, setStory] = useState({ title: "", description: "" })
    const hasMounted = useRef(false);

    useEffect(() => {
        if (!hasMounted.current) {
            hasMounted.current = true;

            const fetchStory = async () => {
                try {
                    const { data } = await axios.get("https://shortstories-api.onrender.com");
                    setStory({ title: data.title, description: data.story });
                    setSpeaking(true);
                    await speakText("Great! I've got an interesting story for you.");
                    await speakText(`The story is titled "${data.title}".`);
                    await speakText("Here's how it goes...");
                    setSpeaking(false)

                    const storyParts = data.story.match(/.{1,500}/g) || [];
                    for (const part of storyParts) {
                        setSpeaking(true);
                        await speakText(part);
                        setSpeaking(false)
                    }
                    setSpeaking(true);
                    await speakText("That's the end of the story. I hope you enjoyed it!");
                    setSpeaking(false)
                    return setListen(true);
                } catch (error) {
                    console.error("Error fetching story:", error);
                    setSpeaking(true);
                    await speakText("Oops! Something went wrong while fetching the story. Please try again later.");
                    setSpeaking(false)
                    return setListen(true);
                }
            };


            fetchStory();
        }
    }, []);


    return (
        <div className="bg-gray-200 p-4 m-4 rounded">
            <h1 className="text-3xl font-bold mb-4">{story.title}</h1>
            <p className="text-gray-700">{story.description}</p>
        </div>
    )
}
