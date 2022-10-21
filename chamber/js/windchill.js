document.getElementById("output").innerHTML = ""


const tempConversor = (temp, windSpeed) => {
    if (temp <= 50 && windSpeed > 3.0) {
        return  (35.74 +
            0.6215 * temp -
            35.75 * windSpeed ** 0.16 +
            0.4275 * temp * windSpeed ** 0.16).toFixed(2)
    } else {
        return `N/A`
    }
}

let inputTemp = Number(document.getElementById("myTemp").innerHTML)
let inputWind = Number(document.getElementById("myWind").innerHTML)

document.getElementById("output").innerHTML += `${tempConversor(inputTemp, inputWind)} ºF`
