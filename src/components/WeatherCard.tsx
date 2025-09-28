import { useAppSelector } from '../store/hooks'

const WeatherCard = () => {
  const { weatherData, forecast } = useAppSelector(state => state.weather)

  if (!weatherData || forecast.length === 0) {
    return null
  }

  return (
    <div className="bg-white p-5 rounded-lg shadow-lg max-w-sm mx-auto max-sm:p-4">
      <div className="main-info">
        <h2 className="m-0 mb-2 font-bold text-2xl">{forecast[0].date}</h2>
        <img src={weatherData.condition.icon} alt={weatherData.condition.text} className="w-20 mx-auto"/>
        <p className="my-1 text-lg">{weatherData.temp_c}°C</p>
        <p className="my-1 text-lg">Condition: {weatherData.condition.text}</p>
        <p className="my-1 text-lg">Humidity: {weatherData.humidity}%</p>
        <p className="my-1 text-lg">Wind: {weatherData.wind_kph} kph</p>
      </div>
      <div className="flex justify-center mt-4 gap-5 max-sm:gap-2.5 max-sm:mt-5">
        {forecast.map((day, index) => (
          <div key={index} className="bg-gray-100 p-4 rounded-md max-sm:p-2.5 text-center">
            <p className="my-1 text-sm">{new Date(day.date).toLocaleDateString("en-US", { weekday: "long" })}</p>
            <img src={day.day.condition.icon} alt={day.day.condition.text} className="w-12 mx-auto"/>
            <p className="my-1 text-sm">{day.day.avgtemp_c}°C</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default WeatherCard