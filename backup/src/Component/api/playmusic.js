import axios from 'axios';
import { speakText } from '../text_to_speack/speaktext';
const playMusic = async (name) => {
    console.log("Music Name", name)
    try {
        const data = await axios.get(`https://saavn.me/search/songs?query=${name}&page=1&limit=10`)
        if (!data.data.data) {
            return speakText("Music not found")
        }
        console.log(data.data.data.results)
        const musicDetails = data.data.data.results;
        return musicDetails;
    } catch (err) {
        console.log(err)
    }
}



const findMusicURL = async (musicDetails) => {
    const urlOptions = {
        method: 'POST',
        url: 'https://jio-saavan-unofficial.p.rapidapi.com/getsong',
        data: {
            encrypted_media_url: musicDetails.encrypted_media_url
        },
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': process.env.REACT_APP_Rapid_API_KEY,
            'X-RapidAPI-Host': 'jio-saavan-unofficial.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(urlOptions);
        const musicURL = response.data;
        return musicURL;
    } catch (error) {
        console.error('Error:', error);
        // setSpeaking(true);
        await speakText("Somting Wrong with me try again")
        // setSpeaking(false);
        return;
    }
};




export { playMusic, findMusicURL };

