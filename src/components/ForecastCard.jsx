import "../styles/Forecast.css"

export default function ForecastCard({ forecast, unit }) {
    if (!forecast) return null

    // Format the date
    const date = new Date(forecast.dt * 1000)
    const dayName = date.toLocaleDateString('en-US', { weekday: 'short' })
    const monthDay = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })

    return (
        <div className="forecast-card">
            <div className="forecast-date">
                <h3>{dayName}</h3>
                <p>{monthDay}</p>
            </div>
            
            <div className="forecast-icon">
                <img 
                    src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`}
                    alt={forecast.weather[0].description}
                />
            </div>

            <div className="forecast-temp">
                <p className="temp-high">
                    {Math.round(forecast.main.temp_max)}°{unit === "metric" ? "C" : "F"}
                </p>
                <p className="temp-low">
                    {Math.round(forecast.main.temp_min)}°{unit === "metric" ? "C" : "F"}
                </p>
            </div>

            <p className="forecast-condition">{forecast.weather[0].description}</p>
            
            <div className="forecast-details">
                <p>💨 {forecast.wind.speed} m/s</p>
                <p>💧 {forecast.main.humidity}%</p>
            </div>
        </div>
    )
}

