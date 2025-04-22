import axios from 'axios'
import { useState, useEffect } from 'react'

const CountryDetails = ({ country }) => {
    const [weather, setWeather] = useState(null);
    const api_key = import.meta.env.VITE_OPEN_WEATHER_MAP_KEY;
    const capital = country.capital[0];

    useEffect(() => {
        setWeather(null);
        if (capital && api_key) {
            axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}&units=metric`)
                .then(response => {setWeather(response.data)});
        }
    }, [country, capital, api_key]);

    let weatherContent = null
    if (weather) {
        const temperature = weather.main.temp;
        const wind = weather.wind.speed;
        const weatherDescription = weather.weather[0].description;
        const iconCode = weather.weather[0].icon;

        weatherContent = (
            <>
                <div>Temperature: {temperature} Celsius</div>
                <img src={`https://openweathermap.org/img/wn/${iconCode}@2x.png`} alt={weatherDescription} />
                <div>Wind: {wind} m/s</div>
            </>
        );
    }

    const languages = Object.values(country.languages);

    return (
        <div key={country.cca3}>
            <h1>{country.name.common}</h1>
            <div>Capital: {capital}</div>
            <div>Area: {country.area} km²</div>
            <h2>Languages</h2>
            <ul>
                {languages.map(languageName => (
                    <li key={languageName}>{languageName}</li>
                ))}
            </ul>
            {country.flags?.svg && (
               <img
                 src={country.flags.svg}
                 alt={`The flag of ${country.name.official}`}
                 width='400'
               />
            )}
            <h2>Weather in {capital}</h2>
            {weatherContent}
        </div>
    );
};

export default CountryDetails