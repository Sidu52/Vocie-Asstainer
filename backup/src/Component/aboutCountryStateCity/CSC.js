import axios from 'axios';
import { speakText } from '../text_to_speack/speaktext';
const VITE_COUNTRY_API_KEY = "Ym1SdzZJbENkZnA5SlR1ZEVrWlBkb2hqdE1VWHNwcTNVaHpKV0E0UA=="
const tellCountry = async (name) => {
    try {
        const countryDetail = await axios.get(`https://api.countrystatecity.in/v1/countries/${name}`, {
            headers: {
                'X-CSCAPI-KEY': "Ym1SdzZJbENkZnA5SlR1ZEVrWlBkb2hqdE1VWHNwcTNVaHpKV0E0UA=="
            }
        })
        var detail = countryDetail.data;
        const { data } = await axios.get(`https://restcountries.com/v3.1/name/${countryDetail.data.name}`);
        if (data) {
            await speakText(`${detail.name} is a ${detail.region} beautiful Country and the official name is ${detail.native} and subregion of this country is ${detail.subregion}`);
            await speakText(`The name of these country is ${data[0].name?.common} and the capital of that country is ${detail.capital} and the currency name of these country is ${detail.currency_name}`);
            return await speakText(`The area of ${detail.name} is ${data[0].area} kilometers and ${detail.name} border is shared with ${data[0].borders?.length} countries border`);
        } else {
            return await speakText(`Sorry ${detail.name} country is not found`);
        }
    } catch (err) {
        console.error(err);
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
            return await speakText(`${data.name} is a ${countryDetail.data.name} beautiful State.`);
        } else {
            return await speakText(`Sorry ${data.name} State is not found`);
        }
    } catch (err) {
        console.error(err);
        // speakText('Sorry, there was an error fetching country data');
    }
};
const tellCity = async (stateCode, name, countryCode) => {
    // console.log("object", category, name)
    try {
        const { data } = await axios.get(`https://api.countrystatecity.in/v1/countries/${countryCode}/states/${stateCode}`, {
            headers: {
                'X-CSCAPI-KEY': "Ym1SdzZJbENkZnA5SlR1ZEVrWlBkb2hqdE1VWHNwcTNVaHpKV0E0UA=="
            }
        });
        if (data) {
            return await speakText(`${name} is a ${data.name} beautiful City.`);
        } else {
            return await speakText(`Sorry ${data.name} State is not found`);
        }

    } catch (err) {
        console.error(err);
        // speakText('Sorry, there was an error fetching country data');
    }
};

const tellCapital = async (country) => {
    try {
        const { data } = await axios.get(`https://restcountries.com/v3.1/name/${country}`);
        if (data) {
            return await speakText(`The Capital of ${country} is a ${data[0].capital}`);
        } else {
            return await speakText(`Sorry ${country} country is not found`);
        }
    } catch (err) {
        console.error(err);
        await speakText('Sorry, there was an error fetching country data');
    }
};

const tellPopulation = async (country) => {
    try {
        const { data } = await axios.get(`https://restcountries.com/v3.1/name/${country}`);
        if (data) {
            return await speakText(`The population of ${country} is a ${data[0].population} population`);
        } else {
            return await speakText(`Sorry ${country} country is not found`);
        }
    } catch (err) {
        console.error(err);
        return await speakText('Sorry, there was an error fetching country data');
    }
};


export { tellCountry, tellState, tellCity, tellCapital, tellPopulation }