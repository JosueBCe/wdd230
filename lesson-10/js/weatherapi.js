// select HTML elements in the document
const currentTemp = document.querySelector('#current-temp');
const figure = document.querySelector("figure");


const url = "https://api.openweathermap.org/data/2.5/weather?q=Fairbanks&appid=204dc8a602f98f1e1149ad7c488a52f4&units=imperial";

async function apiFetch() {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      console.log(data); // this is for testing the call
      displayResults(data);
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.log(error);
  }
}

apiFetch();

function displayResults(weatherData) {
  const iconsrc = `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;
  const desc = weatherData.weather[0].description.toUpperCase();

  currentTemp.innerHTML = `<strong>${weatherData.main.temp.toFixed(0)}</strong>`;
  html =
    `
    <img src="${iconsrc}" alt="${desc}" />
 
    <figcaption>${desc}</figcaption>
    <div>
      <p>Wind Speed: ${weatherData.wind.speed}</p>
      <p>Humidity: ${weatherData.main.humidity}</p>
    </div>
  `

  figure.innerHTML = html
}

