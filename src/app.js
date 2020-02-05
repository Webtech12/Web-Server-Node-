// require path and express module
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const fs = require('fs');

// assigning express to variable
const app = express()

// heroku enviornment variable port || 3000
const port = process.env.PORT || 3000

// creating path location to public directory
const publicDirectory = path.join(__dirname, "../public")
const templatesPath = path.join(__dirname, "../views/templates")
const partialsPath = path.join(__dirname, "../views/partials")
const txtPath = path.join(__dirname, "../txtfiles")
console.log(txtPath);

// setting view engine to hbs to render view 
app.set('view engine', 'hbs')

// setting templates path
app.set('views', templatesPath)

// setting partials path "registerPartials()"
hbs.registerPartials(partialsPath)

// assigning index to default url
app.use(express.static(publicDirectory))

// routes with templating engine to render dynamic content in views
app.get('/', (req, res) => { res.render('index', {
    title: "homie",
    createdBy: "sls"
}) })
app.get('/help', (req, res) => { res.render('help', {
    title: "help",
    createdBy: "sls"
}) })
app.get('/about', (req, res) => { res.render('about', {
    title: "about",
    createdBy: "sls"
}) })
app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            Error: 'No address provided...',
        })
    }

    geocode(req.query.address, (err, data) => {

        if (err) {
            return res.send({ err })
        }
        forecast(data.lat, data.lon, (err, forecastData) => {
            res.send({
                forecast: forecastData.forecast,
                temperature: forecastData.tempStats,
                location: `${data.lat} , ${data.lon}`,
                address: data.location
            })
            const weatherJson = {
                forecast: forecastData.forecast,
                temperature: forecastData.tempStats,
                location: `${data.lat} , ${data.lon}`,
                address: data.location
            }
            saveJson(weatherJson)
        })
    })
})

// saving the weather json in files
const saveJson = (weatherJson) => {
    // console.log(JSON.stringify(weatherJson));
    fs.writeFile(`${txtPath}/weather.json`, JSON.stringify(weatherJson), function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    })
}

// url not found routes

app.get('/help/*', (req, res) => {
    res.render('404Page', {
        message: "Article Not Found",
        title: "Not Found"
    })
})
app.get('*', (req, res) => {
    res.render('404Page', {
        message: "Page not found",
        title: "Not Found"
    })
})

// running the server on port 3000
app.listen(port, () => console.log('Server running'))