

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



document.querySelector("#windChillBtn").addEventListener("click", () => {
    document.getElementById("output").innerHTML = ""
    let inputTemp = document.getElementById("myTemp").value
    let inputWind = document.getElementById("myWind").value

    document.getElementById("output").innerHTML += `Wind Chill: ${tempConversor(inputTemp, inputWind)}` 
})

