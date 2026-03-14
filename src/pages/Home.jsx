import { useState, useEffect } from "react"
import SearchBar from "../components/SearchBar"
import WeatherCard from "../components/WeatherCard"
import ErrorMessage from "../components/ErrorMessage"
import UnitToggle from "../components/UnitToggle"

import "../styles/App.css"


function Home() {

    //set weather
    const [weather, setWeather] = useState(null)

    //loading state
    const [loading, setLoading] = useState(false)

    //error state
    const [error, setError] = useState(null)

    //default city + search
    const [city, setCity] = useState("")

    //unit toggle
    const [unit, setUnit] = useState("imperial")

    //secret
    const API_KEY = import.meta.env.VITE_OPENWEATHER_KEY

    const fetchWeather = async (city) => {
        if (!city) return;

        setLoading(true);
        setError(null);

        const delay = (ms) => new Promise((res) => setTimeout(res, ms));

        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${unit}`;
            const response = await fetch(url);
            const data = await response.json();

            await delay(500); // ensure loading shows at least .5s

            if (data.cod !== 200) {
                setError(data.message);
                setWeather(null);
                return;
            }

            setWeather({
                name: data.name,
                temperature: data.main.temp,
                wind: data.wind.speed,
                condition: data.weather[0].description,
                icon: data.weather[0].icon,
                humidity: data.main.humidity,
                feelsLike: data.main.feels_like
            });
        } catch (error) {
            setError("Failed to fetch weather");
            setWeather(null);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchWeather("Cupertino")
    }, [unit])

    return (

        <div className="main">
            <SearchBar city={city} setCity={setCity} onSearch={() => fetchWeather(city)} />

            <h1>Weather in {weather ? weather.name : "..."}</h1>
            <ErrorMessage message={error} />
            <WeatherCard weather={weather} unit={unit} setUnit={setUnit} />
            {loading && <p>Loading...</p>}

        </div>
    )
}

export default Home