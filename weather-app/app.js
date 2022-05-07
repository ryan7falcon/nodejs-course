import { printDebug } from './utils.js';
import getWeather from './getWeather.js'

printDebug('process.argv: ', process.argv)

const address = process.argv[2]
// test

if (!address) {
  console.log('Please provide address')
}
getWeather(true)(address)
