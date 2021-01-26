const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require("request")
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')



const app = express()

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res)=> {
    res.render('index', {
        title: 'weather app',
        name: 'Bas Neesen'
    })
})

app.get('/about', (req, res)=> {
    res.render('about',{
        title: 'About',
        name: 'Bas Neesen'
    })
})

app.get('/help', (req, res)=> {
    res.render('help',{
        title: 'Help page',
        body: 'FAQ and more contact details are coming soon!'
    })
})



app.get('/weather',(req, res)=> {
    if (!req.query.address){
    return res.send({
error:'No location was entered for retrieval of weather information'
    })
}

geocode(req.query.address, (error, {latitude, longitude, location} ={})=>{
    if (error) {
        return res.send({error})
    }
    forecast(latitude, longitude, (error, forecastData)=>{
        if (error) { 
            return res.send({error})
        }
    res.send({
        forecast: forecastData,
        location,
        address: req.query.address
    })

    })    
})
})

app.get('/products', (req, res)=> {
    if (!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res)=> {
    res.render('404', {
        title:'404',
        name:'Bas Neesen',
        error404: 'Help page not found.'
    })
})
app.get('*', (req, res)=> {
    res.render('404', {
        title:'404',
        name:'Bas Neesen',
        error404: 'Page not found.'
    })
})

app.listen(3000, ()=>{
    console.log('Server is up on port 3000.')
})