let windChill = document.getElementById("wind-chill")



// select HTML elements in the document

const url = "https://api.openweathermap.org/data/2.5/weather?q=Resistencia&appid=204dc8a602f98f1e1149ad7c488a52f4&units=imperial";

async function weaterMain() {
    try {
        //Fetch the Data from the API 
        const response = await fetch(url);
        if (response.ok) {
           
        

            // Make the data in json form
            const data = await response.json();
            
            // Get the wind speed and temperature of the current place
            const windSpeed = data.wind.speed
            const temp = data.main.temp.toFixed(0)

            // Displaying the Weather information
            displayResults(data, temp, windSpeed);
            
            // Calls the tempConversor Function, Calculates the Wind Chill and Display
            windChill.innerHTML += tempConversor(temp, windSpeed)
        
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

weaterMain();

function displayResults(weatherData, temp, wind) {

    const iconsrc = `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;
    const desc = weatherData.weather[0].description.toUpperCase();
    const humidity = weatherData.main.humidity
    
    
    
    
    // Displaying the Weather information
    document.getElementById("weather-descrip").textContent = desc
    document.getElementById("weather-img").src = iconsrc
    document.getElementById("weather-img").alt = desc
    document.getElementById("humidity").innerHTML = `${humidity}%`
    document.getElementById("my-temp").innerHTML = temp
    document.getElementById("my-wind").innerHTML = wind
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
data = "data/data.json"
const titl = document.title
if ( titl == "Argentine Chamber of Commerce") {
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

    const outputInHtml = (processedData) => {
        // getting the companies data
        companies = processedData.companies
        // Filtering company for membershiplevel grater or equal 3 
        companiesFiltered = companies.filter(company => company.membershiplevel >= 3)

        excludeCompanies =  myRandomInts(3, 5)
        console.log(excludeCompanies)
        html = companiesFiltered.map(company => 
        // Excluding the companies randomly selected  
                company != companiesFiltered[excludeCompanies[0]]
            && company != companiesFiltered[excludeCompanies[1]]
            && company != companiesFiltered[excludeCompanies[2]]
        // Formatting the 3 randomly selected company as html
            ? `
            <div class="spotlight">
                <h2>${company.name}</h2>
                <div class="images">
                    <img src="${company.imageurl}" alt="${company.name}" loading="lazy">
                </div>
                <h4>${company.industry}</h4>
                <hr>
                <p>${company.address}</p>
                <p><a href="${company.websiteurl}" target="_blank"> ${company.websiteurl}</a></p>
            </div>
            `

        : ""
        ).join("")

        // Displaying the HTML Companies 
        displayspotlight.innerHTML += html
    }

    displayCompanies(data)
}

function myRandomInts(quantity, max){
    const set = new Set()
    while(set.size < quantity) {
      set.add(Math.floor(Math.random() * max))
    }
    return [...set]
  }

