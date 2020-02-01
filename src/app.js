const path = require('path')
const express = require('express')
const app = express()

const publicDirectory = path.join(__dirname, "../public")
console.log(publicDirectory);

app.set('view engine', 'hbs')
app.use(express.static(publicDirectory))

app.get('/', (req, res) => { res.render('index', {
    name: "homie",
}) })
app.get('/help', (req, res) => { res.sendFile(`${publicDirectory}/help.html`) })
app.get('/about', (req, res) => { res.sendFile(`${publicDirectory}/about.html`) })
app.get('/weather', (req, res) => { res.send({ 
    forecast: 'f' , 
    location: 'loc'
})})


app.listen(3000, () => console.log('Server running'))