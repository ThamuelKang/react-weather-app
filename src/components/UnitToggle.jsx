import "../styles/UnitToggle.css"

export default function UnitToggle({ unit, setUnit }) {
    return (
        <div className="unit-toggle">
            {/* Slider behind buttons */}
            <div className={`slider ${unit}`}></div>

            {/* Buttons */}
            <button
                className={unit === "metric" ? "active" : ""}
                onClick={() => setUnit("metric")}
            >
                Celsius
            </button>
            <button
                className={unit === "imperial" ? "active" : ""}
                onClick={() => setUnit("imperial")}
            >
                Fahrenheit
            </button>
        </div>
    )
}