import axios from 'axios'
import { useState, useEffect } from 'react'

const Information = ({ countriesToShow }) => {
    const [weather, setWeather] = useState(null);
    const country = countriesToShow[0];
    const api_key = import.meta.env.VITE_OPEN_WEATHER_MAP_KEY;

    useEffect(() => {
        if (countriesToShow.length === 1 && api_key) {
            const country = countriesToShow[0];
                setWeather(null);
                axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${api_key}&units=metric`)
                    .then(response => {setWeather(response.data)})
        } else {
            setWeather(null);
        }
    }, [countriesToShow, api_key]);

    if (countriesToShow.length !== 1) {
        return null;
    }

    let weatherContent = null
    if (weather) {
        const temperature = weather.main.temp
        const wind = weather.wind.speed
        const weatherDecription = weather.weather[0].description
        const iconCode = weather.weather[0].icon

        weatherContent = (
            <>
                <div>Temperature: {temperature} Celcius</div>
                <img src={`https://openweathermap.org/img/wn/${iconCode}@2x.png`} alt={weatherDecription} />
                <div>Wind: {wind} m/s</div>
            </>
        )
    }

    return (
        <div>
            <h1>{country.name.common}</h1>
            <div>Capital: {country.capital}</div>
            <div>Area: {country.area} km²</div>
            <h2>Languages</h2>
            <ul>
                {Object.values(country.languages).map(languageName => (
                    <li key={languageName}>{languageName}</li>
                ))}
            </ul>
            <img src={country.flags.svg} alt={`The flag of ${country.name.official}`} width='500'/>
            <h2>Weather in {country.capital}</h2>
            {weatherContent}
        </div>
    )
}

export default Information