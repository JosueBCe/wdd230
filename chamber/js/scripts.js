// FUNCTION THAT ALLOWS TO TOGGLE THE NAV BAR 
toggleMenu = () => {
    document.getElementById("primaryNav").classList.toggle("open");
    document.getElementById("hamburgerBtn").classList.toggle("open");
}
const button = document.getElementById("hamburgerBtn")

button.onclick = () => toggleMenu()





const d = new Date()

const title = document.title

let banner = document.querySelector("#banner")

// In the main page displays today's date 



// Date and Time form was loaded 

if (title === "Join") {
    let date = document.querySelector("#date")
    date.innerHTML = d

}


if (title != "Discover") {
    banner.innerHTML = d.toLocaleDateString('en-uk', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

} else {

    // DISPLAY TO THE USER THE LAST TIME HE/SHE VISITED THE WEBSITE

    let lastVisit = localStorage.getItem('last-visited');

    let greetingMessage = ""

    const todaysDate = Number(new Date());
    // Hide the default message( if JS Fails Loading) 
    banner.style.display = "none"
    // First visit
    if (lastVisit === null) {
        greetingMessage = "Welcome 🤵, This is your first Visit !"

    } else {
        const oneDay = 24 * 60 * 60 * 1000;
        // Compares the amount of days between today's visit and the last visit
        const diffDays = Math.round(Math.abs((Number(lastVisit) - todaysDate) / oneDay));

        if (diffDays == 0) {
            greetingMessage = "You already visited us Today 🥇"
        } else if (diffDays == 1) {
            greetingMessage = `Your last visit was Yesterday`
        } else {
            greetingMessage = `It passed ${diffDays} days from your last visit! 📅`
        }

    }
    // Updates the localStorage "last-visited key"
    localStorage.setItem('last-visited', todaysDate);

    let displayMessage = document.querySelector(".visits")

    displayMessage.textContent = greetingMessage;

}



// Get the full year and displays in the footer section (id:year)

document.querySelector("#year").innerHTML = d.getFullYear();

// Displaying the last time that the web page was modified 

const date = new Object(document.lastModified);

document.getElementById("updated").innerHTML = ` Last Modification: ${date}`;

// Displaying the next meeting message on Mondays and Tuesdays (ONLY) 
let day = d.getDay()

function display() {
    if (day != 1 && day != 2) {
        document.getElementById("myDIV").style.display = "none"
    }
}
display()

// Close the meeting message when the user clicks
function myFunction() {
    document.getElementById("myDIV").style.display = "none";
}

// LOADING IMAGES (LAZY LOADING) and replacing placeholder with images. 

let imagesToLoad = document.querySelectorAll("img[data-src]");

const imgOptions = {
    threshold: 0,
    rootMargin: "0px 0px 400px 0px"
}

const loadingImages = (img) => {
    img.setAttribute("src", img.getAttribute("data-src"));
    img.onload = () => { img.removeAttribute("data-src"); }
}

if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((items, observer) => {
        items.forEach((item) => {
            if (item.isIntersecting) {
                loadingImages(item.target);
                observer.unobserve(item.target);
            }
        });
    }, imgOptions);
    imagesToLoad.forEach((img) => {
        observer.observe(img);
    });
} else {
    imagesToLoad.forEach((img) => {
        loadingImages(img);
    });
}


/* ================= DIRECTORY PAGE ==================== */
if (title == "Directory") {
    data = "data/data.json"
    displayComp = document.getElementById("companies")

    const displayCompanies = (data) => {
        // Fetch the Data 
        fetch(data)
            .then(function (response) {
                // Convert to a Json object
                return response.json();
            })
            .then(function (jsonObject) {
                console.log(jsonObject)
                // Displays the Data in the HTML 
                outputInHtml(jsonObject)
            });
    }

    const outputInHtml = (processedData) => {
        companies = processedData.companies

        html = companies.map(company =>
            `
        <div class="company">
            <h2>${company.name}</h2>
            <img src="${company.imageurl}" alt="${company.name}">
            <p>${company.industry}</p> 
           <p>Visit <a href="${company.websiteurl}" target="_blank"> ${company.websiteurl}</p></a>
            <p>${company.phonenumber}</p>
            </div>
        `
        ).join("")

        displayComp.innerHTML += html
    }

    displayCompanies(data)


    const gridbutton = document.querySelector("#grid-icon");
    const listbutton = document.querySelector("#list");
    const displayCompany = document.querySelector("#companies");

    // The following code could be written cleaner. How? We may have to simplfiy our HTMl and think about a default view.

    gridbutton.addEventListener("click", () => {
        // example using arrow function
        displayCompany.classList.add("grid");
        displayCompany.classList.remove("list");
    });

    listbutton.addEventListener("click", showList); // example using defined function

    function showList() {
        displayCompany.classList.add("list");
        displayCompany.classList.remove("grid");
    }
}