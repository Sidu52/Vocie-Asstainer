import { speakText } from "../text_to_speack/speaktext";

// Define a function to fetch YouTube data using async/await
async function fetchYouTubeData(apiKey, searchQuery, type) {
    try {
        // Construct the API URL based on the type of data you want (video or playlist)
        const baseUrl = 'https://www.googleapis.com/youtube/v3/search';
        const params = new URLSearchParams({
            key: apiKey,
            q: searchQuery,
            type: type,
        });
        const response = await fetch(`${baseUrl}?${params.toString()}`);
        if (!response.ok) {
            throw new Error('Failed to fetch data from YouTube API');
        }
        const data = await response.json();
        // Handle the data here as needed
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        // throw error; // Re-throw the error for the caller to handle
        return await speakText("Somting Wrong with me try again")
    }
}

async function youtube(search) {
    speakText("Okk, Music Play on YouTube")
    const apiKey = process.env.REACT_APP_Youtube_API_KEY;
    const searchQuery = search;
    //   const playlistData = await fetchYouTubeData(apiKey, searchQuery, 'playlist');
    const response = await fetchYouTubeData(apiKey, searchQuery, 'video')
    if (response.items && response.items.length > 0) {
        // Play the first video from the search results
        const videoId = response.items[0].id.videoId;
        return videoId;
        // playYouTubeContent(videoId);
    } else {
        return await speakText('No videos found in the response.');
    }
}


export default youtube;
