import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import SearchBar from './SearchBar'
import weatherReducer from '../store/weatherSlice'

// Test with npm test in terminal

const createTestStore = () => {
  return configureStore({
    reducer: {
      weather: weatherReducer
    }
  })
}

describe('SearchBar Component', () => {
  test('dispatches fetchWeatherData when search button is clicked with valid city', () => {
    const store = createTestStore()
    const dispatchSpy = jest.spyOn(store, 'dispatch')
    
    render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    )

    const input = screen.getByPlaceholderText('Enter city name')
    const button = screen.getByText('Search')

    fireEvent.change(input, { target: { value: 'London' } })
    fireEvent.click(button)

    expect(dispatchSpy).toHaveBeenCalled()
  })

  test('dispatches fetchWeatherData when Enter key is pressed', () => {
    const store = createTestStore()
    const dispatchSpy = jest.spyOn(store, 'dispatch')
    
    render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    )

    const input = screen.getByPlaceholderText('Enter city name')

    fireEvent.change(input, { target: { value: 'Paris' } })
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' })

    expect(dispatchSpy).toHaveBeenCalled()
  })
})