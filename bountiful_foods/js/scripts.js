

// FUNCTION THAT ALLOWS TO TOGGLE THE NAV BAR 
let btn = document.getElementById("hamburger-btn")
btn.onclick = () => toggleMenu()
toggleMenu = () => {
    document.getElementById("primary-nav").classList.toggle("open");
    btn.classList.toggle("open");
}





let title = document.title
data = "data/data.json"
const d = new Date()

let banner = document.querySelector("#banner")

// Date and Time form was loaded 



banner.innerHTML = d.toLocaleDateString('en-uk', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });


// Get the full year and displays in the footer section (id:year)

document.querySelector("#year").innerHTML = d.getFullYear();

// Displaying the last time that the web page was modified 

const date = new Object(document.lastModified);

document.getElementById("updated").innerHTML = ` Last Modification: ${date} `;

// Displaying the next meeting message on Mondays and Tuesdays (ONLY) 
let day = d.getDay()

function display() {
    if (day != 1 && day != 2) {
        document.getElementById("meeting-message").style.display = "none"
    }
}
display()

// Close the meeting message when the user clicks
function myFunction() {
    document.getElementById("meeting-message").style.display = "none";
}
