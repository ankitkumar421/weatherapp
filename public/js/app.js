const weatherForm = document.querySelector('form');
const weatherImg = document.querySelector('.forecast-image');
const search = document.querySelector('input');
const description = document.getElementById('description')
const temprature = document.getElementById('tempreture');
const humidity = document.getElementById('humidity');
const uv = document.getElementById('uv');
const wind = document.getElementById('wind_speed');
const visiblity = document.getElementById('visiblity');
const searchLocation = document.getElementById('location');
const dataBackground = document.querySelector(".result");

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = search.value;
    description.textContent = 'Fetching Weather Data';
    weatherImg.src = ''
    searchLocation.innerHTML = '';
    temprature.innerHTML = '';
    humidity.innerHTML = '';
    uv.innerHTML = '';
    wind.innerHTML = '';
    visiblity.innerHTML = ''; 

    fetch('http://localhost:3000/weather?address='+ location).then((response) => {
    response.json().then((data) => {
        if (data.error){
            temprature.textContent = data.error;
        }else {
            
            weatherImg.src = data.image[0];
            description.textContent = `Weather: ${data.forecast}`;
            temprature.textContent = `Tempreture: ${data.temp} °C`;
            humidity.textContent = `Humidity: ${data.humidity}`;
            uv.textContent = `UV-INDEX: ${data.uv}`;
            wind.textContent = `Wind-Speed: ${data.wind} knot`;
            visiblity.textContent = `Visiblity: ${data.visiblity}`
            searchLocation.textContent = data.location;
        }
    })
})
})

function showData() {
    let data = document.getElementById('show');
    data.style.display = 'block'
}