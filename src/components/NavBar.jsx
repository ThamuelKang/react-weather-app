import { NavLink } from "react-router-dom"
import "../styles/NavBar.css"

export default function NavBar() {
    return (
        <nav className="navbar">
            <div className="nav-container">
                <h2 className="nav-logo">🌤️ Weather App</h2>
                <div className="nav-links">
                    <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                        Current Weather
                    </NavLink>
                    <NavLink to="/forecast" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                        5-Day Forecast
                    </NavLink>
                    <NavLink to="/saved" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                        Saved Cities
                    </NavLink>
                </div>
            </div>
        </nav>
    )
}

