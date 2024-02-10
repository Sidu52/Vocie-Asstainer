import React, { useRef, useEffect, useContext } from "react";
import axios from "axios";
import compromise from 'compromise';
import { MyContext } from "../../Context/Mycontext";
import { Country, State, City } from 'country-state-city';
import { speakText } from '../text_to_speack/speaktext';
const { format } = require('date-fns');
const VITE_WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const VITE_COUNTRY_API_KEY = process.env.REACT_APP_COUNTRY_API_KEY;


export default function CountryStateCity({ category, userInput }) {
    const { setListen, speaking, setSpeaking } = useContext(MyContext);
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
            hasMounted.current = true;
            CountryStateCityfunction();
        }
    }, []);

    async function CountryStateCityfunction() {
        const inputArray = userInput.split(" ");
        const substrings = [];
        for (let i = 0; i < inputArray.length; i++) {
            const substring = [];
            for (let j = i; j < inputArray.length; j++) {
                substring.push(inputArray[j]);
                substrings.push(substring.join(" "));
            }
        }
        await tellCountryStateCity(category, substrings);
    }

    const tellCountryStateCity = async (type, substrings) => {
        let CSCname = "";
        try {
            for (let input of substrings) {
                if (CSCname === "") {
                    const country = Country.getAllCountries().find(c => c.name === input);
                    if (country) {
                        if (type === "country_population" || type === "country_capital") {
                            if (type === "country_capital") {
                                return tellCapital(country.name)
                            } else {
                                if (!country.name) {
                                    return tellPopulation("india")
                                }
                                return tellPopulation(country.name)
                            }
                        } else {
                            CSCname = country.isoCode;
                            return tellCountry(CSCname);
                        }
                    }
                    if (CSCname === "") {
                        const state = State.getAllStates().find(s => s.name === input);
                        if (state) {
                            CSCname = state?.isoCode;
                            return searchWiki(state.name)
                        }
                    }
                    if (CSCname === "") {
                        const city = City.getAllCities().find(city => city.name === input);
                        if (city) {
                            if (type === "City_Weather" || type == "weather_forecast") {
                                setSpeaking(true);
                                await speakText(`Sure, I understand your concern. You're asking about the weather.`);
                                setSpeaking(false);
                                return cityWeather(city.name, type);
                            } else {
                                setSpeaking(true);
                                await speakText(`Alright, you're interested in information about ${city.name}. Let me look that up.`);
                                setSpeaking(false);
                                CSCname = city.name;
                                return searchWiki(city.name);
                            }
                        }
                    }
                }
            }
        } catch (err) {
            console.log(err)
            setSpeaking(true);
            await speakText("Somting Wrong with me try again")
            return setSpeaking(false);
        }
    }




    const cityWeather = async (cityName, type) => {
        try {
            if (type == "City_Weather" && !userInput?.toLowerCase()?.includes("forecast")) {
                const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?units=metric&q=${cityName}&appid=${VITE_WEATHER_API_KEY}`);
                if (data) {
                    setSpeaking(true)
                    await speakText(`Now ${cityName} tempreature is ${data.main.temp} degree celcious and a number of cloud in sky is ${data.clouds.all} with${data.weather[0].description} and the wind speed is ${data.wind.speed}kilometer prati hours.`)
                    setSpeaking(false)
                } else {
                    setSpeaking(true)
                    speakText(`Sorry ${data.name} State is not found`);
                    setSpeaking(false)
                }

            }
            else {
                const currentDate = new Date();
                const formattedCurrentDate = format(currentDate, 'yyyy-MM-dd');

                // Make the API request to get all forecast data for the current city
                const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${VITE_WEATHER_API_KEY}`);
                const currentDayData = data.list.filter(item => {
                    const itemDate = new Date(item.dt_txt);
                    const formattedItemDate = format(itemDate, 'yyyy-MM-dd');
                    return formattedItemDate === formattedCurrentDate;
                });
                if (currentDayData.length > 0) {
                    for (const item of currentDayData) {
                        setSpeaking(true);
                        await speakText(`${formattedCurrentDate} ${cityName} temperature is ${item.main.temp} degrees Celsius, with ${item.clouds.all}% cloud coverage, ${item.weather[0].description}, and a wind speed of ${item.wind.speed} kilometers per hour.`);
                        setSpeaking(false);
                    }
                } else {
                    console.error('No data available for the current date.');
                }

                await speakText("What should I do for you next?");
            }

            // else {
            //     const currentDate = new Date();
            //     const formattedCurrentDate = format(currentDate, 'yyyy-MM-dd');
            //     const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&start_dt=${formattedCurrentDate}&end_dt=${formattedCurrentDate}&appid=${VITE_WEATHER_API_KEY}`);
            //     console.log("DAta", data)
            //     for (const item of data.list) {
            //         setSpeaking(true)
            //         await speakText(`${item.dt_txt} ${cityName} tempreature is ${item.main.temp} degree celcious and a number of cloud in sky is ${item.clouds.all} with${item.weather[0].description} and the wind speed is ${item.wind.speed}kilometer prati hours.`)
            //         setSpeaking(false)
            //     }
            //     await speakText("What should i do for you next ")
            // }
            return setListen(true);
        } catch (err) {
            console.error(err);
            return await speakText("Somting Wrong with me try again");
        }
    };

    async function searchWiki(input) {
        try {
            const doc = compromise(input);
            const nouns = doc.nouns().toTitleCase().out('array');
            let result = null;

            for (let k = 0; k < nouns.length; k++) {
                for (let j = k; j < nouns.length; j++) {
                    const substring = nouns.slice(k, j + 1).join(' ');
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
                            console.error("An error occurred during Wikipedia API request:", error);
                        }
                    }
                }

                if (result) {
                    break;
                }
            }

            if (result) {
                setSpeaking(true);
                await speakText(result);
                setSpeaking(false);
                return setListen(true);
            } else {
                setSpeaking(true);
                await speakText(`Sorry, no relevant information found for "${input}"`);
                setSpeaking(false);
                return setListen(true);
            }

        } catch (error) {
            console.error("An error occurred:", error);
            setSpeaking(true);
            await speakText("An error occurred during the search.");
            setSpeaking(false);
            return setListen(true);
        }
    }


    const tellCountry = async (name) => {
        try {
            const countryDetail = await axios.get(`https://api.countrystatecity.in/v1/countries/${name}`, {
                headers: {
                    'X-CSCAPI-KEY': VITE_COUNTRY_API_KEY
                }
            })
            var detail = countryDetail.data;
            const { data } = await axios.get(`https://restcountries.com/v3.1/name/${countryDetail.data.name}`);
            if (data) {
                setSpeaking(true);
                await speakText(`${detail.name} is a captivating country located in the region of ${detail.region}. Its official name is ${detail.native}, and it falls under the subregion of ${detail.subregion}.`);
                await speakText(`This wonderful nation is known by the name ${data[0].name?.common}. The capital city is ${detail.capital}, and its currency is called ${detail.currency_name}.`);
                await speakText(`Covering an area of ${data[0].area} square kilometers, ${detail.name} shares its borders with ${data[0].borders?.length} neighboring countries.`);
                setSpeaking(false);
                return setListen(true);
            } else {
                setSpeaking(true);
                await speakText(`Apologies, but I couldn't find information about ${detail.name}. It seems like this country is not in my database.`);
                setSpeaking(false);
                return setListen(true);
            }
        } catch (err) {
            console.error(err);
            return setListen(true)
        }
    };
    const tellState = async (name, countryCode) => {
        try {
            const { data } = await axios.get(`https://api.countrystatecity.in/v1/countries/${countryCode}/states/${name}`, {
                headers: {
                    'X-CSCAPI-KEY': VITE_COUNTRY_API_KEY
                }
            });
            const countryDetail = await axios.get(`https://api.countrystatecity.in/v1/countries/${data.country_code}`, {
                headers: {
                    'X-CSCAPI-KEY': VITE_COUNTRY_API_KEY
                }
            })
            if (data) {
                setSpeaking(true);
                await speakText(`${data.name} is a ${countryDetail.data.name} beautiful State.`);
                setSpeaking(false);
                return
            } else {
                setSpeaking(true);
                await speakText(`Sorry ${data.name} State is not found`);
                setSpeaking(true);
                return
            }
        } catch (err) {
            console.error(err);
            return setListen(true)
            // speakText('Sorry, there was an error fetching country data');
        }
    };
    const tellCity = async (stateCode, name, countryCode) => {
        // console.log("object", category, name)
        try {
            const { data } = await axios.get(`https://api.countrystatecity.in/v1/countries/${countryCode}/states/${stateCode}`, {
                headers: {
                    'X-CSCAPI-KEY': VITE_COUNTRY_API_KEY
                }
            });
            if (data) {
                setSpeaking(true);
                await speakText(`${name} is a ${data.name} beautiful City.`);
                setSpeaking(false);
                return setListen(true)
            } else {
                setSpeaking(true);
                await speakText(`Sorry ${data.name} State is not found`);
                setSpeaking(false);
                return setListen(true)
            }

        } catch (err) {
            console.error(err);
            return setListen(true)
            // speakText('Sorry, there was an error fetching country data');
        }
    };

    const tellCapital = async (country) => {
        try {
            const { data } = await axios.get(`https://restcountries.com/v3.1/name/${country}`);
            if (data.length > 0) {
                const countryData = data.find(item => item.name.common.toLowerCase() === country.toLowerCase());
                if (countryData) {
                    setSpeaking(true);
                    await speakText(`The Capital of ${country} is a ${countryData.capital}`);
                    setSpeaking(true);
                } else {
                    setSpeaking(true);
                    await speakText(`Country not found: ${country}`);
                    setSpeaking(true);
                }
            } else {
                setSpeaking(true);
                await speakText(`Sorry ${country} country is not found`);
                setSpeaking(false);
            }
            return setListen(true)
        } catch (err) {
            console.error(err);
            setSpeaking(true);
            await speakText('Sorry, there was an error fetching country data');
            setSpeaking(false);
            return setListen(true)
        }
    };

    const tellPopulation = async (country) => {
        try {
            const { data } = await axios.get(`https://restcountries.com/v3.1/name/${country}`);

            if (data.length > 0) {
                const countryData = data.find(item => item.name.common.toLowerCase() === country.toLowerCase());
                if (countryData) {
                    setSpeaking(true);
                    await speakText(`The population of ${country} is a ${countryData.population} population`);
                    setSpeaking(true);
                } else {
                    setSpeaking(true);
                    await speakText(`Country not found: ${country}`);
                    setSpeaking(true);
                }
            } else {
                setSpeaking(true);
                await speakText(`Sorry ${country} country is not found`);
                setSpeaking(false);
            }
            return setListen(true)
        } catch (err) {
            console.error(err);
            setSpeaking(true);
            await speakText('Sorry, there was an error fetching country data');
            setSpeaking(false);
            return setListen(true)
        }
    };

    return (
        <div>

        </div>
    )
}
