// require path and express module
const path = require('path')
const express = require('express')

// assigning express to variable
const app = express()

// creating path location to public directory
const publicDirectory = path.join(__dirname, "../public")
console.log(publicDirectory);

// setting view engine to hbs to render view 
app.set('view engine', 'hbs')

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
app.get('/weather', (req, res) => { res.send({ 
    forecast: 'f' , 
    location: 'loc'
})})


// running the server on port 3000
app.listen(3000, () => console.log('Server running'))