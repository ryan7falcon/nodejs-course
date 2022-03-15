import request from 'request'
import { trace } from './utils.js'

const mapBoxUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?limit=1&proximity=ip&types=place%2Cpostcode%2Caddress&access_token=${process.env.MAPBOX_TOKEN}`
console.log(mapBoxUrl)

export const mapboxCallback = (error, response) => {
  if (error) {
    console.log('Unable to connect to location services')
  } else if (response.body.features.length === 0) {
    console.log('Unable to find location')
  } else {
    const coordinates = response.body.features[0].center
    const latitude = coordinates[1]
    const longitude = coordinates[0]
    console.log(coordinates)
    trace('longitude')(longitude)
    trace('latitude')(latitude)
  }
}

export const requestMapbox = () => request({ url: mapBoxUrl, json: true }, mapboxCallback)
