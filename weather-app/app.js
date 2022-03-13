import fs from 'fs'

const url = `http://api.weatherstack.com/current?access_key=${process.env.WEATHER_KEY}&query=37.8267,-122.4233`

const main = (error, response) => {
  console.log(response.body.current)
  // fs.writeFileSync('response.json', JSON.stringify(response))
}

// request({ url, json: true }, main)
main(null, JSON.parse(fs.readFileSync('response.json').toString()))
