export interface WeatherData {
  temp_c: number
  condition: {
    text: string
    icon: string
  }
  humidity: number
  wind_kph: number
}

export interface ForecastDay {
  date: string
  day: {
    avgtemp_c: number
    condition: {
      text: string
      icon: string
    }
  }
}

export interface WeatherState {
  weatherData: WeatherData | null
  forecast: ForecastDay[]
  error: boolean
  showNotification: boolean
}