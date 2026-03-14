import { useState } from "react"
import { useSavedCities } from "../context/SavedCitiesContext"
import SavedCityCard from "../components/SavedCityCard"
import UnitToggle from "../components/UnitToggle"

import "../styles/App.css"
import "../styles/SavedCities.css"

function SavedCities() {
    const { savedCities, removeCity, clearAllCities } = useSavedCities()
    const [unit, setUnit] = useState("imperial")

    const handleRemoveCity = (cityName) => {
        if (window.confirm(`Remove ${cityName} from saved cities?`)) {
            removeCity(cityName)
        }
    }

    const handleClearAll = () => {
        if (window.confirm("Remove all saved cities?")) {
            clearAllCities()
        }
    }

    return (
        <div className="main">
            <h1>Saved Cities</h1>

            <UnitToggle unit={unit} setUnit={setUnit} />

            {savedCities.length === 0 ? (
                <div className="empty-state">
                    <p>No saved cities yet.</p>
                    <p>Save cities from the home or forecast page to see them here!</p>
                </div>
            ) : (
                <>
                    <div className="saved-cities-header">
                        <p className="saved-count">{savedCities.length} saved {savedCities.length === 1 ? 'city' : 'cities'}</p>
                        <button onClick={handleClearAll} className="clear-all-btn">
                            Clear All
                        </button>
                    </div>

                    <div className="saved-cities-grid">
                        {savedCities.map((city) => (
                            <SavedCityCard
                                key={city}
                                cityName={city}
                                unit={unit}
                                onRemove={handleRemoveCity}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}

export default SavedCities