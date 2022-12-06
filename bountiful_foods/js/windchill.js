let windChill = document.getElementById("wind-chill")

// select HTML elements in the document

const url = "https://api.openweathermap.org/data/3.0/onecall?lat=33.1580&lon=-117.3505&appid=f4bc1306c8c0bda6307d0dc8941437a4&units=imperial&exclude=minutely,hourly";
async function weaterMain() {
    try {
        //Fetch the Data from the API 
        const response = await fetch(url);
        if (response.ok) {

            // Make the data in json form
            const data = await response.json();
            
            // Get the wind speed and temperature of the current place
            const windSpeed = data.current.wind_speed

            // Obtaining forecast data
            const forecastData = data.daily

            // Obtaining Temperature
            const temp = data.current.temp.toFixed(0)
            
            // Calculating Wind Chill
            let windChill = tempConversor(temp, windSpeed)

            // Displaying the Weather information
            document.querySelector(".current-weather").innerHTML = displayResults(data.current, temp, windSpeed, windChill);
            document.getElementById("forecast").innerHTML += forecastWeather(forecastData)
            

        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

weaterMain();

const forecastWeather = (data) => {
    forecastHtml = data.slice(0, 3).map((info, index) => 
    `
    <div>
        <h4>Day ${index + 1}</h4>
        <hr>
        <img src="https://openweathermap.org/img/w/${info.weather[0].icon}.png" alt="${info.weather[0].description.toUpperCase()}">
        
        <p>${info.temp.min}°</p>
        <p>${info.temp.max}°</p>
    </div>
    `)
    .join("")

    return forecastHtml
}


function displayResults(weatherData, temp, wind, windChill) {

    const iconsrc = `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;
    const desc = weatherData.weather[0].description.toUpperCase();
    const humidity = weatherData.humidity
    // Displaying the Weather information
    html = `<h2> Current Weather</h2>
    <div class="weather">
        <img src="${iconsrc}" alt="${desc}">
        <div class="temp">${temp}</div>
    </div>
    <h4 id="weather-descrip">${desc}</h4>
    <div class="weather-wind">
        <p>Wind Speed: ${wind}</p>
        <p>Wind Chill: ${windChill}</p>
    </div>
    <p>Humidity: ${humidity}%</p>
    `
    return html
}


const tempConversor = (temp, windSpeed) => {
    if (temp <= 50 && windSpeed > 3.0) {
        let temperature = (35.74 +
            0.6215 * temp -
            35.75 * windSpeed ** 0.16 +
            0.4275 * temp * windSpeed ** 0.16).toFixed(2)
        return `${temperature}Fº`
    } else {
        return `N/A`
    }
}

/* ============= Displaying Spotlights ================== */
data = "https://brotherblazzard.github.io/canvas-content/fruit.json"
const titl = document.title

storedOrders = document.querySelector(".stored-orders")


const ordersCard = () => {
    for (let [key, value] of Object.entries(localStorage)) {

        console.log(key, value)
        fruits = value.replace(/[\[\]'"]/g, '').split(",")
        orderHtml = fruits.map((fruit, index) =>
            index == 0 ?`
        <div class="ordered-fruit" id="${key}">
            <div  class="order-subtitle">
                <h4>${key}</h4>
                <i onclick="cancelOrderMain('${key}')">❌</i>
            </div>
             <p>${fruit}</p>`
            :
            index == 2 ?
            `<p>${fruit}</p>
        </div>`
        :
        `<p>${fruit}</p>`)
        .join("")



        storedOrders.innerHTML += orderHtml

    }
}
const updateLayout = () => {
    let ordersAmount = storedOrders.childElementCount
    ordersCards = document.querySelector(".orders-card")
    ordersImg = document.querySelector(".orders-card img")
    ordersAmount == 3 ? ordersCards.style.maxHeight = "900px" :
        ordersAmount == 0 ? (ordersCards.style.maxHeight = "450px", ordersImg.style.width = "90%", ordersCards.style.height = "fit-content")
            : ordersCards.style.width = "fit-content"

}


const cancelOrderMain = (key) => {
    localStorage.removeItem(`${key}`)
    document.getElementById(`${key}`).remove()
    updateLayout()
}

const outputInHtml = (processedData) => {
    randomIndex = myRandomInts(1, 35)

    options = processedData.splice(randomIndex, 4)
    // getting the companies data
    html = options.map(fruit => `
        <div class="spotlight">
            <h2>${fruit.name}</h2>
            
            <h4>${fruit.family}</h4>
            <hr>
           <a href="fresh.html">
            <button class="submit-btn">Prepare my Mix</button>
            </a>
        </div>
        `
    ).join("")

    // Displaying the HTML Companies 
    displayspotlight.innerHTML += html
}
if (titl == "Bountiful Foods") {
    displayspotlight = document.getElementById("spotlights")

    const displayCompanies = (data) => {
        // Fetch the Data 
        fetch(data)
            .then(function (response) {
                // Convert to a Json object
                return response.json();
            })
            .then(function (jsonObject) {
                // Displays the Data in the HTML 
                outputInHtml(jsonObject)
            });
    }
    displayCompanies(data)
    ordersCard()
    updateLayout()
}



function myRandomInts(quantity, max) {
    const set = new Set()
    while (set.size < quantity) {
        set.add(Math.floor(Math.random() * max))
    }
    return [...set]
}




const slides = document.querySelectorAll(".slide");

// loop through slides and set each slides translateX
slides.forEach((slide, indx) => {
  slide.style.transform = `translateX(${indx * 100}%)`;
});

// select next slide button
const nextSlide = document.querySelector(".btn-next");

// current slide counter
let curSlide = 0;
// maximum number of slides
let maxSlide = slides.length - 1;

// add event listener and navigation functionality
nextSlide.addEventListener("click", function () {
  // check if current slide is the last and reset current slide
  if (curSlide === maxSlide) {
    curSlide = 0;
  } else {
    curSlide++;
  }

  //   move slide by -100%
  slides.forEach((slide, indx) => {
    slide.style.transform = `translateX(${100 * (indx - curSlide)}%)`;
  });
});

// select next slide button
const prevSlide = document.querySelector(".btn-prev");

// add event listener and navigation functionality
prevSlide.addEventListener("click", function () {
  // check if current slide is the first and reset current slide to last
  if (curSlide === 0) {
    curSlide = maxSlide;
  } else {
    curSlide--;
  }

  //   move slide by 100%
  slides.forEach((slide, indx) => {
    slide.style.transform = `translateX(${100 * (indx - curSlide)}%)`;
  });
});