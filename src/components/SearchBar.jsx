import { useState } from "react";

function SearchBar({ onSearch }) {
    const [city, setCity] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        if (city.trim() === "") return
        onSearch(city.trim())
        setCity("")
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter a city"
                required
            />
            <button type="submit">Search</button>

        </form >
    )
}

export default SearchBar