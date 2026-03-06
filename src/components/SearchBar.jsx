import "../styles/SearchBar.css"

export default function SearchBar({ city, setCity, onSearch }) {

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!city) return
        onSearch()
        // Clears input
        setCity("")
    }

    return (
        <form className="search" onSubmit={handleSubmit}>
            <input
                className="search-bar"
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter city"
            />
            <button className="search-button" type="submit">Search</button>
        </form>
    )
}