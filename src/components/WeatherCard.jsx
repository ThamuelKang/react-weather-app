import "../styles/WeatherCard.css"
import UnitToggle from "./UnitToggle"

export default function WeatherCard({ weather, unit, setUnit }) {

    if (!weather) return

    return (
        <section className="weather-card">

            <div className="weather-icon">
                {weather.icon && (
                    <img
                        src={`https://openweathermap.org/img/wn/${weather.icon}@4x.png`}
                        alt={weather.condition}
                    />
                )}
            </div>

            <div className="weather-temp">
                <h2>{Math.round(weather.temperature)}°{unit === "metric" ? "C" : "F"}</h2>
            </div>

            <p className="weather-condition">{weather.condition}</p>

            <div className="weather-details">
                <div className="detail-item">
                    <span className="detail-icon">💨</span>
                    <span className="detail-text">{weather.wind} m/s</span>
                </div>
                {weather.humidity && (
                    <div className="detail-item">
                        <span className="detail-icon">💧</span>
                        <span className="detail-text">{weather.humidity}%</span>
                    </div>
                )}
                {weather.feelsLike && (
                    <div className="detail-item">
                        <span className="detail-icon">🌡️</span>
                        <span className="detail-text">Feels like {Math.round(weather.feelsLike)}°</span>
                    </div>
                )}
            </div>

            <UnitToggle unit={unit} setUnit={setUnit} />

        </section>
    )
}