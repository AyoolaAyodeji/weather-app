const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for express config
const publicDiretoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDiretoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Ayoola Ayodeji'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
      title: 'About me',
      name: 'Ayoola Ayodeji'   
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
      title: 'Help',
      helpText :'This is some helpful text',
      name: 'Ayoola Ayodeji'
    })
})


app.get('/weather', (req, res) => {
    if (!req.query.address)  {
        return res.send({
            error: 'You must provide an address'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => { 
           if (error) {
               return res.send({error})
           }
         
           forecast(latitude, longitude, (error, forecastData)=>{
               if (error) {
                   return res.send({error})
               }
                
               res.send({
                forecast : forecastData,
                location,
                address: req.query.address
               })
            


           })

    })
    
})





app.get('/help/*', (req, res) => {
     res.render('404', {
        title: '404',
        name: 'Ayoola Ayodeji',
        errorMessage: 'Help article not found' 
     })
})
app.get('*', (req, res) => {
     res.render('404', {
         title: '404',
         name: 'Ayoola Ayodeji',
         errorMessage: 'Page not found'
     })
})


app.listen(port, ()=>{
    console.log('Server is up on port ' + port)
})