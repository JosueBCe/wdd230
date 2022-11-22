// FUNCTION THAT ALLOWS TO TOGGLE THE NAV BAR 
toggleMenu = () => {
    document.getElementById("primaryNav").classList.toggle("open");
    document.getElementById("hamburgerBtn").classList.toggle("open");
}
const button = document.getElementById("hamburgerBtn")

button.onclick = () => toggleMenu()


/* ============= Displaying Spotlights ================== */
data = "data/data.json"
const title = document.title
if ( title == "Argentine Chamber of Commerce") {
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
        
        // determine which companies to remove from the filtered list(3)
        let excludeCompany1 = Math.floor(Math.random() * 5);
        let excludeCompany2 = Math.floor(Math.random() * 4);
        let excludeCompany3 = Math.floor(Math.random() * 3)
        let excludeCompany = excludeCompany2 != excludeCompany1 ? excludeCompany2 : excludeCompany2 + 1 ;
        let excludeCompany4 = excludeCompany3 != excludeCompany && excludeCompany3 != excludeCompany1 ? excludeCompany3 : excludeCompany2 + 2 ;
        console.log(excludeCompany)
        console.log(excludeCompany1)
        console.log(excludeCompany4)
      
        
        html = companiesFiltered.map(company => 
        // Excluding the companies randomly selected  
                company != companiesFiltered[excludeCompany1]
            && company != companiesFiltered[excludeCompany]
            && company != companiesFiltered[excludeCompany4]
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
                <p><a href="${company.websiteurl}" target="_blank"> ${company.websiteurl}</p></a>
            </div>
            `

        : ""
        ).join("")

        // Displaying the HTML Companies 
        displayspotlight.innerHTML += html
    }

    displayCompanies(data)
}

const d = new Date()


let banner = document.querySelector("#banner")

// Date and Time form was loaded 

if (title === "Join") {
    let date = document.querySelector("#date")
    date.innerHTML = d

}


banner.innerHTML = d.toLocaleDateString('en-uk', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

if (title == "Discover"){
    // DISPLAY TO THE USER THE LAST TIME HE/SHE VISITED THE WEBSITE

    let lastVisit = localStorage.getItem('last-visited');

    let greetingMessage = ""

    const todaysDate = Number(new Date());
    // Hide the default message( if JS Fails Loading) 
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

document.getElementById("updated").innerHTML = ` Last Modification: ${date} `;

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
    listbutton.style.display = "block";
    gridbutton.style.display = "none";
    gridbutton.addEventListener("click", () => {
        // example using arrow function
        displayCompany.classList.add("grid");
        displayCompany.classList.remove("list");
        gridbutton.style.display = "none";
        listbutton.style.display = "block";
    });

    listbutton.addEventListener("click", showList); // example using defined function

    function showList() {
        displayCompany.classList.add("list");
        displayCompany.classList.remove("grid");
        listbutton.style.display = "none";
        gridbutton.style.display = "block";
    }
}