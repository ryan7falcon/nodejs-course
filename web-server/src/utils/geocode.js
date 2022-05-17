import request from 'request'
import { trace } from '../utils.js'

export default (address, callback) => {
  const mapBoxUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?limit=1&proximity=ip&types=place%2Cpostcode%2Caddress&access_token=${process.env.MAPBOX_TOKEN}`
  // console.log(mapBoxUrl)
  request({ url: mapBoxUrl, json: true }, ((error, { body }) => {
    trace('body')(body)
    if (error) {
      callback('Unable to connect to location services', undefined)
    } else if (body.features.length === 0) {
      callback('Unable to find location', undefined)
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      })
    }
  }))
}
