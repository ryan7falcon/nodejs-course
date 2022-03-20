import forecast from './utils/forecast.js'
import geocode from './utils/geocode.js'

geocode('New York', (error, data) => {
  console.log('Error', error)
  console.log('data', data)
})

forecast(true)(44.1545, -75.7088, (error, data) => {
  console.log('Error', error)
  console.log('Data', data)
})
