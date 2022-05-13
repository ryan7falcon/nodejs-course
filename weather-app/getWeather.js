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
  return forecast(mock)(latitude, longitude, (err, forecastData) => {
    if (err) {
      return console.log('Error', err)
    }
    console.log('location: ', location)
    return console.log('forecastData: ', forecastData)
  })
})
