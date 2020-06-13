const request = require('request')


const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=7dee5cfb6a2208472a3a4acdf788c7a3&query=' + latitude + ',' + longitude

  request({url, json: true},(error, { body }) => {
  if(error) {
      callback('Sorry, something went wrong!', undefined) 
  } else if(body.error) {
      callback('unable to find coordinates', undefined)
      } else {
          callback(undefined, body.daily.data[0].summary + 'It is currently ' + body.current.temperature +  ' degrees out. The high today is ' + body.daily.data[0] + temperatureHigh + ' with a space of ' + body.daily.data[0].temperatureLow + ' degrees out. There is a ' + body.currrently.precip + '% chance of rain.')
           }
        
        }) 

    }




module.exports = forecast