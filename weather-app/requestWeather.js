import dotenv from 'dotenv'
import fs from 'fs'
import request from 'request'

dotenv.config({ path: './.env' })

const url = `http://api.weatherstack.com/current?access_key=${process.env.WEATHER_KEY}&query=37.8267,-122.4233`
console.log(url)
const responseFileName = 'response.json'

export const main = (mock) => (error, response) => {
  if (error) {
    console.log('unable to connect to weather forecast service!')
  } else if (response.body.error) {
    console.log('unable to find location')
  } else {
    const { current } = response.body
    console.log(current)
    console.log(`${current.weather_descriptions[0]}. It is currently ${current.temperature}C and it feels like ${current.feelslike}C`)
    if (!mock) {
      fs.writeFileSync(responseFileName, JSON.stringify(response))
    }
  }
}

export const requestWeather = (mock) => {
  if (!mock) {
    request({ url, json: true }, main(false))
  } else {
    main(true)(null, JSON.parse(fs.readFileSync(responseFileName).toString()))
  }
}
