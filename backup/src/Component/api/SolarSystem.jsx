import React, { useRef, useEffect, useContext } from "react";
import axios from 'axios';
import { MyContext } from '../../Context/Mycontext';
import { speakText } from '../text_to_speack/speaktext';
import { takeInput } from '../../Screen/MainVoiceFuntion';

export default function SolarSystem({ userInput }) {
    const { setListen, setSpeaking, setMicListen } = useContext(MyContext);
    const hasMounted = useRef(false);
    const planets = [
        'Mercury',
        'Venus',
        'Earth',
        'Mars',
        'Jupiter',
        'Saturn',
        'Uranus',
        'Neptune',
        'Moon',
        "Phobos",
        'Deimos',
        "Io",
        'Europa',
        'Ganymede',
        'Callisto',
        'Titan',
        'Enceladus',
        'Mimas',
        'Titania', 'Oberon', 'Miranda', 'Triton', 'Proteus', 'Nereid'
    ];

    useEffect(() => {
        if (!hasMounted.current) {
            // Only run the effect on the initial mount
            hasMounted.current = true;
            fetchData();
        }
    }, []);

    const searchInformation = async (name) => {
        try {
            const { data } = await axios.get(`https://api.le-systeme-solaire.net/rest/bodies/${name}`);
            if (data) {
                console.log("object", data)
                return data
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const fetchData = async () => {
        try {
            if (userInput && userInput.toLowerCase().includes("all") && userInput.toLowerCase().includes("planets")) {
                setSpeaking(true)
                await speakText("In our Solar System, there are originally considered nine planets. However, in 2006, Pluto was reclassified by the International Astronomical Union. The remaining planets are: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, and Neptune.");
                setSpeaking(false)
                return setListen(true);
            }

            const foundName = planets?.find(planet => userInput?.toLowerCase().includes(planet?.toLowerCase()));
            let nameToSearch;

            if (foundName) {
                nameToSearch = foundName;
            } else {
                // If the name is not found, prompt the user to provide a planet name
                setSpeaking(true)
                await speakText("I'm sorry, I didn't catch that. Please provide a planet name.");
                setSpeaking(false)
                setMicListen(true)
                nameToSearch = await takeInput();
                setMicListen(false)

                // Find the planet name in the new user input
                const foundName = planets.find(planet => nameToSearch.toLowerCase().includes(planet.toLowerCase()));

                if (foundName) {
                    nameToSearch = foundName;
                } else {
                    setSpeaking(true)
                    await speakText("I couldn't find information about that planet. Please try again.");
                    setSpeaking(false)
                    return setListen(true);
                }
            }

            // Search for information based on the name
            const data = await searchInformation(nameToSearch);

            if (userInput && userInput.toLowerCase().includes("all") && userInput.toLowerCase().includes("moons")) {
                setSpeaking(true)
                await speakText(`${data.englishName} is classified as a ${data.bodyType} and has ${data.moons.length} moons.`);
                setSpeaking(false)
                if (data.moons.length > 0) {
                    let moonsName = data.moons.map(moon => moon.moon).join(", ");
                    setSpeaking(true)
                    await speakText(`The moons are: ${moonsName}`);
                    setSpeaking(false)
                } else {
                    setSpeaking(true)
                    await speakText("This celestial body does not have any known moons.");
                    setSpeaking(false)
                }
                return setListen(true);
            } else if (data.bodyType === "Moon") {
                // If it's a moon, get information about the planet it orbits
                const planetData = await axios.get(data.aroundPlanet.rel);
                setSpeaking(true)
                await speakText(`${data.englishName} is classified as a ${data.bodyType}. It orbits ${planetData.data.englishName}. It has a gravitational force of ${data.gravity}, an average temperature of ${data.avgTemp} degrees.`);
                setSpeaking(false)
                if (data.discoveredBy && data.discoveryDate) {
                    setSpeaking(true)
                    await speakText(`${data.englishName} was discovered by ${data.discoveredBy} on ${data.discoveryDate}.`);
                    setSpeaking(false)
                }
            } else {
                setSpeaking(true)
                // If it's a planet, get information about its moons
                await speakText(`${data.englishName} is classified as a ${data.bodyType}. It has a gravitational force of ${data.gravity}, an average temperature of ${data.avgTemp} degrees, and it has ${data.moons.length} moons.`);
                setSpeaking(false)

                for (let i = 0; i < data.moons.length; i++) {
                    // Get information about each moon
                    const moonData = await axios.get(data.moons[i].rel);
                    setSpeaking(true)
                    await speakText(`One of its moons is ${moonData.englishName}.`);
                    setSpeaking(false)
                }
            }

            return setListen(true);

        } catch (error) {
            console.error("Error:", error);
            setSpeaking(true)
            await speakText("Oops! Something went wrong. Please try again later.");
            setSpeaking(false)
            return setListen(true);
        }
    };


    // const fetchData = async () => {
    //     try {
    //         if (userInput && userInput.toLowerCase().includes("all") && userInput.toLowerCase().includes("planets")) {
    //             await speakText("In our Solar System, there are originally considered nine planets. However, in 2006, Pluto was reclassified by the International Astronomical Union. The remaining planets are: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, and Neptune.");
    //             return setListen(true);
    //         }

    //         const foundName = planets?.find(planet => userInput?.toLowerCase().includes(planet?.toLowerCase()));
    //         let nameToSearch;

    //         if (foundName) {
    //             nameToSearch = foundName;
    //         } else {
    //             // If the name is not found, prompt the user to provide a planet name
    //             await speakText("Please provide a planet name.");
    //             nameToSearch = await takeInput();

    //             // Find the planet name in the new user input
    //             const foundName = planets.find(planet => nameToSearch.toLowerCase().includes(planet.toLowerCase()));

    //             if (foundName) {
    //                 nameToSearch = foundName;
    //             } else {
    //                 await speakText("Planet name not found.");
    //                 return setListen(true)
    //             }
    //         }

    //         // Search for information based on the name
    //         const data = await searchInformation(nameToSearch);

    //         if (userInput && userInput.toLowerCase().includes("all") && userInput.toLowerCase().includes("moons")) {
    //             await speakText(`${data.englishName} is classified as a ${data.bodyType} and has ${data.moons.length} moons.`);
    //             if (data.moons.length > 0) {
    //                 let moonsName = data.moons.map(moon => moon.moon).join(", ");
    //                 await speakText(`The moons are: ${moonsName}`);
    //             } else {
    //                 await speakText("This celestial body does not have any known moons.");

    //             }
    //             return setListen(true)
    //         }

    //         else if (data.bodyType === "Moon") {
    //             console.log("Moon", data)
    //             // If it's a moon, get information about the planet it orbits
    //             const planetData = await axios.get(data.aroundPlanet.rel);
    //             console.log("object", planetData)
    //             await speakText(`${data.englishName} is classified as a ${data.bodyType}. It orbits ${planetData.data.englishName}. It has a gravitational force of ${data.gravity}, an average temperature of ${data.avgTemp} degrees.`);
    //             if (data.discoveredBy && data.discoveryDate) {
    //                 console.log("ENter", data)
    //                 await speakText(`${data.englishName} was discovered by ${data.discoveredBy} on ${data.discoveryDate}.`);

    //             }
    //         } else {
    //             // If it's a planet, get information about its moons
    //             await speakText(`${data.englishName} is classified as a ${data.bodyType}. It has a gravitational force of ${data.gravity}, an average temperature of ${data.avgTemp} degrees, and it has ${data.moons.length} moons.`);

    //             for (let i = 0; i < data.moons.length; i++) {
    //                 // Get information about each moon
    //                 const moonData = await axios.get(data.moons[i].rel);
    //                 await speakText(`${moonData.englishName}`);
    //             }
    //         }

    //         return setListen(true);

    //     } catch (error) {
    //         console.error("Error:", error);
    //     }
    // };

    return (
        <div>

        </div>
    )
}
