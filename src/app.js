const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const { response } = require('express')
 
const app = express()

//defines path to express configration
const publicDirectory = path.join(__dirname, '../public')
const viewspath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials');

//setup handelbar engine and view location
app.set('view engine', 'hbs');
app.set('views', viewspath);
hbs.registerPartials(partialPath)

//setup static directory to server
app.use(express.static(publicDirectory))
app.use('/static', express.static(path.join(__dirname, '../public')))

app.get('',(req, res) =>{
    res.render('index', {
        title: 'Weather',
        name: 'Ankit Kumar'
    })
})

app.get('/about',(req, res) =>{
    res.render('about', {
        title: 'About Page',
        name: 'Ankit Kumar'
    })
})

app.get('/help',(req, res) =>{
    res.render('help', {
        title: 'HELP',
        name: 'Ankit Kumar'
    })
})

app.get('/weather',(req, res) => {
    if(!req.query.address){
        return res.send({
            error: "Please provide the address"
        })
    }
    
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastObj) => {
            if (error) {
                return res.send({error})
            }



            res.send({
                forecast: forecastObj.weather_descriptions,
                location,
                address: req.query.address,
                temp: forecastObj.temperature,
                humidity: forecastObj.humidity,
                uv: forecastObj.uv_index,
                wind: forecastObj.wind_speed,
                visiblity: forecastObj.visibility,
                image: forecastObj.weather_icons,
            })
        })
    })
})

app.get('/products',(req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'Please enter something to search'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*',(req, res) => {
    res.render('404' ,{
        title: '404 error',
        name: 'Ankit',
        errorMsg: 'Help Article not found'
    })
})

app.get('*',(req, res) => {
   res.render('404', {
       title: '404',
       name: 'Ankit',
       errorMsg: 'Page not found'
   })
})

app.listen(3000, () => {
    console.log('server is running on port 3000')
})