import React, { useRef, useEffect, useContext } from "react";
import axios from "axios";
import Geocode from "react-geocode";
import compromise from 'compromise';
import { MyContext } from "../../Context/Mycontext";
import { Country, State, City } from 'country-state-city';
import { speakText } from '../text_to_speack/speaktext';
import { cityWeather } from './weatherAPi'

// const VITE_COUNTRY_API_KEY = "Ym1SdzZJbENkZnA5SlR1ZEVrWlBkb2hqdE1VWHNwcTNVaHpKV0E0UA=="
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


    async function getLocation() {
        if (navigator.geolocation) {
            return new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        resolve(position);
                    },
                    (error) => {
                        reject(`Geolocation error: ${error.message}`);
                    }
                );
            });
        } else {
            await speakText("Geolocation is not supported by this browser.");
        }
    }

    async function getAddressName(latitude, longitude) {
        try {
            // Assuming Geocode is properly imported
            const response = await Geocode.fromLatLng(`${latitude},${longitude}`, {
                key: "AIzaSyC9lT69Cbj7BhsuXBd35ZPVzUfZrDHQ4t4",
                language: "en",
                region: "us",
            });

            console.log("Data", response);
            return response.results[0].formatted_address;
        } catch (error) {
            console.error(error);
            throw new Error("Error fetching address name");
        }
    }

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
                return
            } else {
                setSpeaking(true);
                await speakText(`Sorry, no relevant information found for "${input}"`);
                setSpeaking(false);
                return
            }

        } catch (error) {
            console.error("An error occurred:", error);
            setSpeaking(true);
            await speakText("An error occurred during the search.");
            setSpeaking(false);
            return
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
            if (data) {
                setSpeaking(true);
                await speakText(`The Capital of ${country} is a ${data[0].capital}`);
                setSpeaking(false);
                return setListen(true)
            } else {
                setSpeaking(true);
                await speakText(`Sorry ${country} country is not found`);
                setSpeaking(false);
                return setListen(true)
            }
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
            if (data) {
                setSpeaking(true);
                await speakText(`The population of ${country} is a ${data[0].population} population`);
                setSpeaking(false);
                return setListen(true)
            } else {
                setSpeaking(true);
                await speakText(`Sorry ${country} country is not found`);
                setSpeaking(false);
                return setListen(true)
            }
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
