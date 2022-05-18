import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url';
import hbs from 'hbs'
import geocode from './utils/geocode.js'
import forecast from './utils/forecast.js'

const app = express()
const port = process.env.PORT || 3000

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// define paths for express config
const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup static directory to serve
app.use(express.static(publicDir))

// setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Ryan',
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    name: 'Ryan',
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'Ryan',
    message: 'Help is coming',
  })
})

app.get('/weather', (req, res) => {
  const { address } = req.query
  const mock = false

  if (!address) {
    return res.send({
      error: 'You must provide an address',
    })
  }

  geocode(address, (error, {
    latitude,
    longitude,
    location,
  } = {}) => {
    if (error) {
      return res.send({
        error,
      })
    }
    return forecast(mock)(latitude, longitude, (err, forecastData) => {
      if (err) {
        return res.send({
          error,
        })
      }
      return res.send({
        forecast: forecastData,
        location,
        address,
      })
    })
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404 Page Not Found',
    name: 'Ryan',
    message: 'Help Article Not Found',
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404 Page Not Found',
    name: 'Ryan',
    message: 'Page Not Found',
  })
})

app.listen(port, () => {
  console.log(`Server is up on port ${port}`)
})
