import dotenv from 'dotenv'
import fs from 'fs'
import request from 'request'

dotenv.config({ path: '.env' })
const responseFileName = 'response.json'

export const main = (mock) => (error, response, callback) => {
  if (error) {
    callback('unable to connect to weather forecast service!', undefined)
  } else if (response.body.error) {
    callback('unable to find location', undefined)
  } else {
    const { current } = response.body
    if (!mock) {
      fs.writeFileSync(responseFileName, JSON.stringify(response))
    }
    callback(undefined, `${current.weather_descriptions[0]}. It is currently ${current.temperature}C and it feels like ${current.feelslike}C`)
  }
}

export default (mock) => (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=${process.env.WEATHER_KEY}&query=${latitude},${longitude}`
  // console.log(url)
  if (!mock) {
    request({ url, json: true }, (error, response) => main(false)(error, response, callback))
  } else {
    const response = JSON.parse(fs.readFileSync(responseFileName).toString())
    main(true)(null, response, callback)
  }
}
