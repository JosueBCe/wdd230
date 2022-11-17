let windChill = document.getElementById("windChill")



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
    document.getElementById("weatherDescrip").textContent = desc
    document.getElementById("weatherImg").src = iconsrc
    document.getElementById("weatherImg").alt = desc
    document.getElementById("humidity").innerHTML = `${humidity}%`
    document.getElementById("myTemp").innerHTML = temp
    document.getElementById("myWind").innerHTML = wind
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
