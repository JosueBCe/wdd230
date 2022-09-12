const y = new Date();
let year = y.getFullYear();
const date = new Object (document.lastModified);

document.getElementById("year").innerHTML = `&copy; ${year} || Josué B. Centurión || Resistencia`;   

document.getElementById("updated").innerHTML =`Last Updated: ${date}`;
