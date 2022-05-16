const express = require('express')
const path = require('path')
const hbs = require('hbs')

const app = express()

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
  res.send({
    forecast: 'asd',
    location: 'lo',
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

app.listen(3000, () => {
  console.log('Server is up on port 3000')
})
