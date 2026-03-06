import "../styles/WeatherCard.css"
import UnitToggle from "./UnitToggle"

export default function WeatherCard({ weather, unit, setUnit }) {

    if (!weather) return

    return (
        <section className="weather-card">

            <h2>{weather.temperature} °{unit === "metric" ? "C" : "F"}</h2>

            <div className="metadata">
                <p>Wind: {weather.wind} m/s</p>
                <p>Condition: {weather.condition}</p>
            </div>

            <UnitToggle unit={unit} setUnit={setUnit} />


        </section>
    )
}