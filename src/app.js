const path = require('path')
const express = require('express')
const ejs = require('ejs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define lines for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engin and views location
app.set('view engine', 'ejs')
app.set('views', viewsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Juras',
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    name: 'Juras',
  })
})

app.get('', (req, res) => {
  res.send('<h1>Weather</h1>')
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    helpText: 'Here you can find all the help articles.',
    name: 'Juras',
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'Please provide an address',
    })
  }

  geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error })
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        res.send({ error })
      }

      res.send({
        location,
        forecast: forecastData,
        address: req.query.address,
      })
    })
  })
})

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term',
    })
  }

  console.log(req.query.search)
  res.send({
    products: [],
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    errorText: 'Help article not found',
    name: 'Juras',
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    errorText: '404 Page not found',
    name: 'Juras',
  })
})

app.listen(8000, () => {
  console.log('Server is up on port 8000.')
})
