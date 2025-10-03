import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import WeatherCard from './WeatherCard'
import weatherReducer from '../store/weatherSlice'

// Test with npm test in terminal

const createTestStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      weather: weatherReducer
    },
    preloadedState: initialState
  })
}

describe('WeatherCard Component', () => {
  test('renders weather data correctly when data is available', () => {
    const mockState = {
      weather: {
        weatherData: {
          temp_c: 20,
          condition: {
            text: 'Sunny',
            icon: 'https://example.com/sunny.png'
          },
          humidity: 65,
          wind_kph: 15
        },
        forecast: [
          {
            date: '2025-10-02',
            day: {
              avgtemp_c: 22,
              condition: {
                text: 'Partly cloudy',
                icon: 'https://example.com/partly-cloudy.png'
              }
            }
          }
        ],
        error: false,
        showNotification: false
      }
    }

    const store = createTestStore(mockState)

    render(
      <Provider store={store}>
        <WeatherCard />
      </Provider>
    )

    expect(screen.getByText('20°C')).toBeInTheDocument()
    expect(screen.getByText('Condition: Sunny')).toBeInTheDocument()
    expect(screen.getByText('Humidity: 65%')).toBeInTheDocument()
    expect(screen.getByText('Wind: 15 kph')).toBeInTheDocument()
  })

  test('returns null when no weather data is available', () => {
    const mockState = {
      weather: {
        weatherData: null,
        forecast: [],
        error: false,
        showNotification: false
      }
    }

    const store = createTestStore(mockState)

    const { container } = render(
      <Provider store={store}>
        <WeatherCard />
      </Provider>
    )

    expect(container.firstChild).toBeNull()
  })
})