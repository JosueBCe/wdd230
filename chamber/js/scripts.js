toggleMenu = () => {
    document.getElementById("primaryNav").classList.toggle("open");
    document.getElementById("hamburgerBtn").classList.toggle("open");

}
const button = document.getElementById("hamburgerBtn")

button.onclick = () => toggleMenu()


const d = new Date()

const dayAndNum = {weekday:"long", day:"numeric"}

document.querySelector("#today-date").innerHTML = d.toLocaleDateString('en-uk', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

document.querySelector("#year").innerHTML = d.getFullYear();



const date = new Object (document.lastModified);
document.getElementById("updated").innerHTML =` Last Modification: ${date}`;

/* window.onresize = () => {if (window.innerWidth > 1024) 
    mainnav.classList.toggle('responsive')};  */


let dates = new Date()
let day = 2/* dates.getDay() */

function display () {
if (day != 1 && day != 2) {
    document.getElementById("myDIV").style.display = "none"
}
}

display()

function myFunction() {
    document.getElementById("myDIV").style.display = "none";
}
/* 
function showHTML(){
    alert("<img src=\"https://myweb.com/images/banners/1.gif\" border=0>");
} */