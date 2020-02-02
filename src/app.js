// require path and express module
const path = require('path')
const express = require('express')
const hbs = require('hbs')

// assigning express to variable
const app = express()

// creating path location to public directory
const publicDirectory = path.join(__dirname, "../public")
const templatesPath = path.join(__dirname, "../views/templates")
const partialsPath = path.join(__dirname, "../views/partials")
console.log(publicDirectory);

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
    res.send({
        forecast: 'f',
        location: 'loc',
        address: req.query.address
})})


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
app.listen(3000, () => console.log('Server running'))