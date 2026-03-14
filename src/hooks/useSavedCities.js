import { useState, useEffect } from "react"

const STORAGE_KEY = "weatherAppSavedCities"

export function useSavedCities() {
    const [savedCities, setSavedCities] = useState([])

    // Load saved cities from localStorage on mount
    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY)
        if (stored) {
            try {
                setSavedCities(JSON.parse(stored))
            } catch (error) {
                console.error("Error loading saved cities:", error)
                setSavedCities([])
            }
        }
    }, [])

    // Save to localStorage whenever savedCities changes
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(savedCities))
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

    return {
        savedCities,
        addCity,
        removeCity,
        isCitySaved,
        clearAllCities
    }
}

