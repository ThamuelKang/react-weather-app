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
        <form className="search-bar" onSubmit={handleSubmit}>
            <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter city"
            />
            <button type="submit">Search</button>
        </form>
    )
}