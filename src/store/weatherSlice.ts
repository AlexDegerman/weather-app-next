import { createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import type { WeatherState } from "./types"
import axios from "axios"

const initialState: WeatherState = {
  weatherData: null,
  forecast: [],
  error: false,
  showNotification: false
}

export const fetchWeatherData = createAsyncThunk(
  'weather/fetchWeatherData',
  async (city: string, { rejectWithValue }) => {
    try {
      const apiKey = process.env.NEXT_PUBLIC_API_KEY
      const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=4&aqi=no&alerts=no`
      const response = await axios.get(url)

      return {
        weatherData: response.data.current,
        forecast: response.data.forecast.forecastday
      }
    } catch {
      return rejectWithValue('Could not fetch weather data')
    }
  }
)

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    hideNotification: (state) => {
      state.showNotification = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherData.pending, (state) => {
        state.error = false
        state.showNotification = false
      })
      .addCase(fetchWeatherData.fulfilled, (state, action) => {
        state.weatherData = action.payload.weatherData
        state.forecast = action.payload.forecast
      })
      .addCase(fetchWeatherData.rejected, (state) => {
        state.error = true
        state.showNotification = true
        state.weatherData = null
        state.forecast = []
      })
  },
})

export const { hideNotification } = weatherSlice.actions
export default weatherSlice.reducer