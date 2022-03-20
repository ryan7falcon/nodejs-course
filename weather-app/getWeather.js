import forecast from './utils/forecast.js'
import geocode from './utils/geocode.js'

export default (address) => geocode(address, (error, data) => {
  if (error) {
    return console.log('Error', error)
  }
  return forecast(true)(data.latitude, data.longitude, (error, forecastData) => {
    if (error) {
      return console.log('Error', error)
    }
    console.log('location: ', data.location)
    return console.log('forecastData', forecastData)
  })
})
