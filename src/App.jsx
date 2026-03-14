import { BrowserRouter, Routes, Route } from "react-router-dom"
import NavBar from "./components/NavBar"

import Home from "./pages/Home"
import Forecast from "./pages/Forecast"
import SavedCities from "./pages/SavedCities"

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/forecast" element={<Forecast />} />
        <Route path="/saved" element={<SavedCities />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App