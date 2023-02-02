var express = require('express')
const fs = require('fs')
const hbs = require('hbs')
var path = require('path')
var app = express()
const requests = require('requests')



const staticpath = path.join(__dirname, "../public") 
const partialsPath = path.join(__dirname, "../templates/partials")
// setting the view engine to express
app.set('views', path.join(__dirname, '../templates')) 
app.set('view engine', 'hbs') 

hbs.registerPartials(partialsPath)


app.get('/', (req, res) => {
        requests(`https://api.openweathermap.org/data/2.5/weather?q=${req.query.name}&appid=229b984d2e6394f1f16f7a6759c04aa6`)
        .on("data", (chunk) => {
            const objdata = JSON.parse(chunk);
            const arrData = [objdata]
            // const degCel = (arrData[0].main.temp - 32)*(5/9);
            // console.log(arrData[0].name, arrData[0].main.temp);
            console.log(arrData[0]);
            
        })   

 
    res.render('index', {title:'Getty',link1:'Home', link2:'About', link3:'Contact', link4:'Email', country: req.query.name, city: req.query.name})
})

app.get('/about', (req, res) => {
    // console.log(req.query.country);
    const country = req.query.country
    const city = req.query.city
    res.render('about', {title:'About',link1:'Home', link2:'About', link3:'Contact', link4:'Email', country: country, city: city})
})
//app get 404 error for index
app.get('/index/*', (req, res) => {
    res.render('404', {title:'404',link1:'Home', link2:'About', link3:'Contact', link4:'Email',errorMsg:'Ooops Page Not Found........'})
})

//app get 404 error
app.get('*', (req, res) => {
    res.render('404', {title:'404',link1:'Home', link2:'About', link3:'Contact', link4:'Email',errorMsg:'Ooops Page Not Found........'})
})


app.listen(8000, () =>{
    console.log('listening......')
})

