import { useState, useEffect } from "react"
import SearchBar from "../components/SearchBar"


function Home() {

    const [weather, setWeather] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const API_KEY = import.meta.env.VITE_OPENWEATHER_KEY
    
    const fetchWeather = async (city) => {
        if (!city) return

        setLoading(true)
        setError(null)

        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
            const response = await fetch(url)
            const data = await response.json()

            if (data.cod !== 200) {
                setError(data.message)
                setWeather(null)
                return
            }

            setWeather({
                name: data.name,
                temperature: data.main.temp,
                wind: data.wind.speed,
                condition: data.weather[0].description
            })
        } catch (error) {
            setError("Failed to fetch weather")
            setWeather(null)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchWeather("Cupertino")
    }, [])

    return (

        <div>
            <h1>Weather</h1>

            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {weather && (
                <div>
                    <h2>{weather.name}</h2>
                    <p>Temperature: {weather.temperature} C</p>
                    <p>Wind: {weather.wind} m/s</p>
                    <p>Condition: {weather.condition} </p>
                </div>
            )}
        </div>
    )
}

export default Home