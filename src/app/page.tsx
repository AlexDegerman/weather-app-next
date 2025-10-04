"use client"
import { useEffect } from "react"
import SearchBar from "../components/SearchBar"
import WeatherCard from "../components/WeatherCard"
import { useAppDispatch, useAppSelector } from "../store/hooks"
import { hideNotification } from "../store/weatherSlice"
import { useSession, signIn, signOut } from 'next-auth/react'
import { Cloud, LogOut } from 'lucide-react'

export default function HomePage() {
  const { weatherData, showNotification } = useAppSelector(
    (state) => state.weather
  )
  const dispatch = useAppDispatch()
  const { data: session, status } = useSession()

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
      <div className="mb-5">
        <h1 className="text-blue-800 text-3xl font-normal text-center mb-3">
          Weather App
        </h1>
        
        <div className="flex items-center justify-center gap-2 flex-wrap">
          {status === 'loading' ? (
            <div className="px-4 py-2 text-sm text-blue-600">Loading...</div>
          ) : session ? (
            <>
              <span className="text-blue-800 text-sm font-medium">
                {session.user?.name}
              </span>
              <button
                onClick={() => signOut()}
                className="flex items-center gap-2 bg-white text-blue-600 px-3 py-1.5 rounded-full font-medium text-sm hover:bg-blue-50 border border-blue-200 hover:border-blue-300 transition-all shadow-sm hover:shadow-md"
              >
                <LogOut className="w-4 h-4" />
                Sign out
              </button>
            </>
          ) : (
            <button
              onClick={() => signIn('google')}
              className="flex items-center gap-2 bg-white text-blue-600 px-4 py-2 rounded-full font-medium text-sm hover:bg-blue-50 border border-blue-200 hover:border-blue-300 transition-all shadow-sm hover:shadow-md"
            >
              <Cloud className="w-4 h-4" />
              Sign in
            </button>
          )}
        </div>
      </div>

      <SearchBar />

      {showNotification && (
        <div className="rounded p-4 mt-2.5 bg-red-100 text-red-800">
          <p>Could not fetch weather data</p>
          <p>Please check the city name</p>
        </div>
      )}

      {weatherData && <WeatherCard />}
    </>
  )
}