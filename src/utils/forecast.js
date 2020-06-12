const request = require('request')


const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=7dee5cfb6a2208472a3a4acdf788c7a3&query=' + latitude + ',' + longitude

  request({url, json: true},(error, { body }) => {
  if(error) {
      callback('Sorry, something went wrong!', undefined) 
  } else if(body.error) {
      callback('unable to find coordinates', undefined)
      } else {
    
          callback(undefined,  'It is currently ' + body.current.temperature +  ' degrees out. The humidity is '  + body.current.humidity + '% . There is ' + body.current.precip + ' % chance of rain.')
           }
        
        }) 

    }




module.exports = forecast