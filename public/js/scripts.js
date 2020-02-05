console.log('scripts loaded');

// fetching forecasts data through fetch api

const fetchForecast = (params, callback) => {
    fetch(`/weather?address=${params}`).then((response) => {
        response.json().then((data) => {
            if (data.err)
                console.log(data.err)
            else
                console.log(data)
                p1.textContent = data.forecast,
                p2.textContent = data.location,
                p3.textContent = data.address,
                p4.textContent = data.temperature
                

        })
    })
}



// client form functions
const weatherForm = document.querySelector('form')
const input = document.querySelector('input')
const p1 = document.querySelector('#m1')
const p2 = document.querySelector('#m2')
const p3 = document.querySelector('#m3')
const p4 = document.querySelector('#temp')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    let city = input.value
    
    console.log(fetchForecast(city));
})