"use client"

import { useEffect } from "react"
import SearchBar from "../components/SearchBar"
import WeatherCard from "../components/WeatherCard"
import { useAppDispatch, useAppSelector } from "../store/hooks"
import { hideNotification } from "../store/weatherSlice"

export default function HomePage() {
  const { weatherData, showNotification } = useAppSelector(
    (state) => state.weather
  )
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (showNotification) {
      const timer = setTimeout(() => {
        dispatch(hideNotification())
      }, 4000)

      return () => clearTimeout(timer)
    }
  }, [showNotification, dispatch])

  return (
    <>
      <h1 className="text-blue-800 text-3xl font-normal mb-5">Weather App</h1>
      <SearchBar />
      {showNotification && (
        <div className="rounded p-4 mt-2.5">
          <p>Could not fetch weather data</p>
          <p>Please check the city name</p>
        </div>
      )}
      {weatherData && <WeatherCard />}
    </>
  )
}
