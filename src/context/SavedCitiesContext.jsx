import { createContext, useContext, useState, useEffect } from "react"

const SavedCitiesContext = createContext()

const STORAGE_KEY = "weatherAppSavedCities"

export function SavedCitiesProvider({ children }) {
    const [savedCities, setSavedCities] = useState([])

    // Load saved cities from localStorage on mount
    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY)
        if (stored) {
            try {
                const parsed = JSON.parse(stored)
                setSavedCities(parsed)
                console.log("Loaded saved cities:", parsed)
            } catch (error) {
                console.error("Error loading saved cities:", error)
                setSavedCities([])
            }
        }
    }, [])

    // Save to localStorage whenever savedCities changes
    useEffect(() => {
        if (savedCities.length >= 0) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(savedCities))
            console.log("Saved cities to localStorage:", savedCities)
        }
    }, [savedCities])

    const addCity = (cityName) => {
        if (!cityName) return false
        
        // Check if city already exists (case-insensitive)
        const exists = savedCities.some(
            city => city.toLowerCase() === cityName.toLowerCase()
        )
        
        if (exists) {
            return false
        }

        setSavedCities(prev => [...prev, cityName])
        return true
    }

    const removeCity = (cityName) => {
        setSavedCities(prev => 
            prev.filter(city => city.toLowerCase() !== cityName.toLowerCase())
        )
    }

    const isCitySaved = (cityName) => {
        if (!cityName) return false
        return savedCities.some(
            city => city.toLowerCase() === cityName.toLowerCase()
        )
    }

    const clearAllCities = () => {
        setSavedCities([])
    }

    const value = {
        savedCities,
        addCity,
        removeCity,
        isCitySaved,
        clearAllCities
    }

    return (
        <SavedCitiesContext.Provider value={value}>
            {children}
        </SavedCitiesContext.Provider>
    )
}

export function useSavedCities() {
    const context = useContext(SavedCitiesContext)
    if (!context) {
        throw new Error("useSavedCities must be used within SavedCitiesProvider")
    }
    return context
}

