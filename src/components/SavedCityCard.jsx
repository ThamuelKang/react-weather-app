import { useState, useEffect } from "react"
import "../styles/SavedCities.css"

export default function SavedCityCard({ cityName, unit, onRemove }) {
    const [weather, setWeather] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const API_KEY = import.meta.env.VITE_OPENWEATHER_KEY

    useEffect(() => {
        fetchWeather()
    }, [cityName, unit])

    const fetchWeather = async () => {
        setLoading(true)
        setError(null)

        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=${unit}`
            const response = await fetch(url)
            const data = await response.json()

            if (data.cod !== 200) {
                setError("Failed to load")
                setWeather(null)
                return
            }

            setWeather({
                name: data.name,
                temperature: data.main.temp,
                condition: data.weather[0].description,
                icon: data.weather[0].icon
            })
        } catch (error) {
            setError("Failed to load")
            setWeather(null)
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <div className="saved-city-card loading">
                <p>Loading...</p>
            </div>
        )
    }

    if (error || !weather) {
        return (
            <div className="saved-city-card error">
                <h3>{cityName}</h3>
                <p className="error-text">{error}</p>
                <button onClick={() => onRemove(cityName)} className="remove-btn">
                    Remove
                </button>
            </div>
        )
    }

    return (
        <div className="saved-city-card">
            <button 
                onClick={() => onRemove(cityName)} 
                className="remove-icon"
                aria-label="Remove city"
            >
                ×
            </button>
            
            <h3>{weather.name}</h3>
            
            <div className="saved-city-icon">
                <img 
                    src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                    alt={weather.condition}
                />
            </div>

            <p className="saved-city-temp">
                {Math.round(weather.temperature)}°{unit === "metric" ? "C" : "F"}
            </p>

            <p className="saved-city-condition">{weather.condition}</p>
        </div>
    )
}

