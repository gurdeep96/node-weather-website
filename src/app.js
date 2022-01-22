const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()
const port = process.env.PORT || 3000

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../template/views')
const partialPath = path.join(__dirname,'../template/partials')

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

// Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather',
        name: "Willi"
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        helpText: "Bachao page",
        title : "Help hai naam",
        name: "Willi"

    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: "About page",
        name: "Willi"
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
    return res.send({
        error : 'Error'
    })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast : forecastData,
                location,
                address : req.query.address
            })
        })
    })
 
})
app.get('/products',(req,res)=>{
    if(!req.query.search){
       return res.send({
            error: 'You must provide a search term!'
        })
    }   
    
    res.send({
       products: []
    })
})
app.get('/help/*',(req,res)=>{
    res.send("Help article not Found!")
})
app.get('*',(req,res)=>{
    res.send("My 404 page Error!")
})
app.listen(port,()=>{
    console.log('Server is Up!')
})