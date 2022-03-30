const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
  const url =
    'http://api.weatherstack.com/current?access_key=da873902b57cfaf41d4e56b8900ab101&query=' +
    latitude +
    ',' +
    longitude +
    '&units=m'

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable co connect to weather services!')
    } else if (body.error) {
      callback(body.error.info)
    } else {
      callback(
        undefined,
        body.current.weather_descriptions[0] +
          '. It is currently ' +
          body.current.temperature +
          ' degrees out. It feels like ' +
          body.current.feelslike +
          ' degrees.'
      )
    }
  })
}

module.exports = forecast
