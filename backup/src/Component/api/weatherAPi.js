import axios from "axios";
import { speakText } from "../text_to_speack/speaktext";
const VITE_WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY
const cityWeather = async (cityName, type) => {
    try {
        if (type == "City_Weather") {
            const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?units=metric&q=${cityName}&appid=${VITE_WEATHER_API_KEY}`);
            if (data) {
                speakText(`Now ${cityName} tempreature is ${data.main.temp} degree celcious and a number of cloud in sky is ${data.clouds.all} with${data.weather[0].description} and the wind speed is ${data.wind.speed}kilometer prati hours.`)
            } else {
                speakText(`Sorry ${data.name} State is not found`);
            }
            return;
        } else {
            const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&cnt=5&appid=${VITE_WEATHER_API_KEY}`);
            for (const item of data.list) {
                // Create a Date object from the timestamp (multiply by 1000 to convert seconds to milliseconds)
                const date = new Date(item.dt * 1000);
                // You can then format the date and time as needed
                const formattedDate = date.toLocaleString(); // This will format the date and time according to the user's locale
                speakText(`${formattedDate} ${cityName} tempreature is ${item.main.temp} degree celcious and a number of cloud in sky is ${item.clouds.all} with${item.weather[0].description} and the wind speed is ${item.wind.speed}kilometer prati hours.`)
            }
        }
    } catch (err) {
        console.error(err);
        return await speakText("Somting Wrong with me try again");
    }
};

export { cityWeather };