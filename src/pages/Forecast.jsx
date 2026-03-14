import { useState, useEffect } from "react"
import SearchBar from "../components/SearchBar"
import ForecastCard from "../components/ForecastCard"
import ErrorMessage from "../components/ErrorMessage"
import UnitToggle from "../components/UnitToggle"
import { useSavedCities } from "../context/SavedCitiesContext"

import "../styles/App.css"
import "../styles/Forecast.css"

function Forecast() {
    console.log("Forecast component rendering")

    // State management
    const [forecast, setForecast] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [city, setCity] = useState("")
    const [currentCity, setCurrentCity] = useState("Cupertino")
    const [unit, setUnit] = useState("imperial")

    // Saved cities hook
    const { addCity, removeCity, isCitySaved } = useSavedCities()

    // API key
    const API_KEY = import.meta.env.VITE_OPENWEATHER_KEY
    console.log("API Key exists:", !!API_KEY)

    // Fetch 5-day forecast
    const fetchForecast = async (cityName) => {
        if (!cityName) return

        setLoading(true)
        setError(null)

        const delay = (ms) => new Promise((res) => setTimeout(res, ms))

        try {
            const url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=${unit}`
            console.log("Fetching from URL:", url)
            const response = await fetch(url)
            const data = await response.json()
            console.log("API Response:", data)

            await delay(500) // ensure loading shows at least .5s

            // Check for errors (cod can be string "200" or number 200)
            if (data.cod !== "200" && data.cod !== 200) {
                console.log("Error from API:", data.message)
                setError(data.message || "City not found")
                setForecast([])
                return
            }

            // Group forecasts by day and take one per day
            const dailyForecasts = []
            const seenDates = new Set()

            for (const item of data.list) {
                const date = new Date(item.dt * 1000)
                const dateKey = date.toDateString()

                // Take the first forecast for each unique day (or closest to noon)
                if (!seenDates.has(dateKey)) {
                    seenDates.add(dateKey)
                    dailyForecasts.push(item)

                    if (dailyForecasts.length === 5) break
                }
            }

            console.log("Daily forecasts:", dailyForecasts)
            setForecast(dailyForecasts)
            setCurrentCity(data.city.name)
        } catch (error) {
            console.error("Fetch error:", error)
            setError("Failed to fetch forecast. Please check your API key.")
            setForecast([])
        } finally {
            setLoading(false)
        }
    }

    // Fetch on mount and when unit changes
    useEffect(() => {
        console.log("Fetching forecast for:", currentCity)
        fetchForecast(currentCity)
    }, [unit])

    const handleToggleSaveCity = () => {
        if (!currentCity) return

        if (isCitySaved(currentCity)) {
            removeCity(currentCity)
        } else {
            const success = addCity(currentCity)
            if (!success) {
                alert("City is already saved!")
            }
        }
    }

    return (
        <div className="main">
            <SearchBar
                city={city}
                setCity={setCity}
                onSearch={() => {
                    fetchForecast(city)
                }}
            />

            <h1>5-Day Forecast for {currentCity}</h1>

            {currentCity && (
                <button
                    onClick={handleToggleSaveCity}
                    className="save-city-btn"
                >
                    {isCitySaved(currentCity) ? "★ Saved" : "☆ Save City"}
                </button>
            )}

            <UnitToggle unit={unit} setUnit={setUnit} />

            <ErrorMessage message={error} />

            {loading && <p>Loading forecast...</p>}

            {!loading && !error && forecast.length === 0 && (
                <p>No forecast data available. Try searching for a city.</p>
            )}

            {!loading && forecast.length > 0 && (
                <div className="forecast-container">
                    {forecast.map((day, index) => (
                        <ForecastCard
                            key={index}
                            forecast={day}
                            unit={unit}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

export default Forecast