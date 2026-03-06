import "../styles/WeatherCard.css"

export default function WeatherCard({ weather }) {

    if (!weather) return

    return (
        <div className="weather-card">
            <h2>{weather.name}</h2>
            <p>Temperature: {weather.temperature} °C</p>
            <p>Wind: {weather.wind} m/s</p>
            <p>Condition: {weather.condition}</p>
        </div>
    )
}