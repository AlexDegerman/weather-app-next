import { useState } from "react"
import { useAppDispatch } from '../store/hooks'
import { fetchWeatherData } from '../store/weatherSlice'

const SearchBar = () => {
  const [city, setCity] = useState<string>("")
  const dispatch = useAppDispatch()

  const handleSearch = () => {
    if (city.trim() !== "") {
      dispatch(fetchWeatherData(city))
    }
  }

  return (
    <div className="flex gap-2.5 mb-5 justify-center max-sm:flex-col">
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSearch()
          }
        }}
        className="py-2.5 px-2.5 text-base border-2 border-white rounded-md w-64 outline-none bg-white max-sm:w-full"
      />
      <button
        onClick={handleSearch}
        className="px-4 py-2.5 text-base text-white bg-orange-400 border-none rounded-md cursor-pointer transition-colors duration-300 hover:bg-orange-500 max-sm:w-full max-sm:py-3"
      >
        Search
      </button>
    </div>
  )
}

export default SearchBar