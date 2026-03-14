# 🌤 React Weather App

A simple weather application built with **React** that allows users to
search for cities and view both **current weather conditions and a 5‑day
forecast**. The app fetches weather data from the **OpenWeather API**
using asynchronous requests.

## Features

-   Search weather by city
-   View **current weather** and **5‑day forecast**
-   Toggle between **imperial and metric units**
-   **Save favorite cities** and manage them later
-   Remove individual saved cities or clear all
-   Persistent saved cities using browser storage
-   Simple responsive UI

## Tech Stack

-   **React**
-   **React Hooks (`useState`, `useEffect`, Context API)**
-   **OpenWeather API**
-   **CSS with a small design system using variables**

## Installation

Clone the repository:

``` bash
git clone https://github.com/ThamuelKang/react-weather-app.git
cd react-weather-app
```

Install dependencies:

``` bash
npm install
```

Run the development server:

``` bash
npm run dev
```

Open in your browser:

    http://localhost:5173

(You need to connect to your own OpenWeather API key and create a .env file)
