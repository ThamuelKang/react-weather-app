import { BrowserRouter, Routes, Route } from "react-router-dom"

import Home from "./pages/Home"
import Forecast from "./pages/Forecast"
import SavedCities from "./pages/SavedCities"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/forecast" element={<Forecast />} />
        <Route path="/saved" element={<SavedCities />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App