import forecast from './utils/forecast.js'
import geocode from './utils/geocode.js'

export default (mock) => (address) => geocode(address, (error, {
  latitude,
  longitude,
  location,
} = {}) => {
  if (error) {
    return console.log('Error', error)
  }
  return forecast(mock)(latitude, longitude, (error, forecastData) => {
    if (error) {
      return console.log('Error', error)
    }
    console.log('location: ', location)
    return console.log('forecastData', forecastData)
  })
})
