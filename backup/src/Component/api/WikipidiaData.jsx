import React, { useRef, useEffect, useContext } from "react";
import { MyContext } from "../../Context/Mycontext";
import { speakText } from "../text_to_speack/speaktext";
import compromise from 'compromise';
import axios from "axios";

export default function WikipidiaData({ input }) {
    const { setListen, setSpeaking } = useContext(MyContext);
    const hasMounted = useRef(false);
    const wikiEndpoint = "https://simple.wikipedia.org/w/api.php";
    const wikiParams =
        "?action=query" +
        "&prop=extracts" +
        "&exsentences=2" +
        "&exlimit=1" +
        "&titles=";
    const last = "&explaintext=1" +
        "&format=json" +
        "&formatversion=2" +
        "&origin=*";

    useEffect(() => {
        if (!hasMounted.current) {
            // Only run the effect on the initial mount
            hasMounted.current = true;
            searchWiki();
        }
    }, []);

    async function searchWiki() {
        try {
            // Tokenize the input and get nouns
            const doc = compromise(input);
            const nouns = doc.nouns().toTitleCase().out('array');

            // Initialize the result
            let result = null;

            for (let k = 0; k < nouns.length; k++) {
                for (let j = k; j < nouns.length; j++) {
                    // Create a substring from the nouns
                    const substring = nouns.slice(k, j + 1).join(' ');

                    // Check if the substring is not a personal pronoun
                    if (!['I', 'We', 'You', 'They', 'He', 'She', 'It'].includes(substring)) {
                        try {
                            // Use axios for better readability and error handling
                            const response = await axios.get(wikiEndpoint + wikiParams + substring + last);

                            if (response.status === 200) {
                                const data = response.data;
                                const page = data.query.pages[0];
                                result = page.extract;
                                break;
                            }
                        } catch (error) {
                            setSpeaking(true)
                            await speakText("Oops! It looks like I'm experiencing technical difficulties at the moment. I apologize for the inconvenience. Please try again later, and thank you for your understanding.");
                            setSpeaking(false)
                            setListen(true)
                        }
                    }
                }

                if (result) {
                    break;
                }
            }

            if (result) {
                setSpeaking(true)
                await speakText(result);
                setSpeaking(false)
                return setListen(true)
            } else {
                setSpeaking(true)
                await speakText(`Sorry, no relevant information found for "${input}"`);
                setSpeaking(false)
                return setListen(true)
            }

        } catch (error) {
            console.error("An error occurred:", error);
            setSpeaking(true)
            await speakText("An error occurred during the search.");
            setSpeaking(false)
            return setListen(true)
        }
    }

    return (
        <div>

        </div>
    )
}
