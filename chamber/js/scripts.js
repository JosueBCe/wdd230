

// FUNCTION THAT ALLOWS TO TOGGLE THE NAV BAR 
let btn = document.getElementById("hamburgerBtn")
btn.onclick = () => toggleMenu()
toggleMenu = () => {
    document.getElementById("primaryNav").classList.toggle("open");
    btn.classList.toggle("open");
}




document.cookie = "witcher=Geralt; SameSite=None; Secure"



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
        document.getElementById("myDIV").style.display = "none"
    }
}
display()

// Close the meeting message when the user clicks
function myFunction() {
    document.getElementById("myDIV").style.display = "none";
}

// LOADING IMAGES (LAZY LOADING) and replacing placeholder with images. 

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
            <a href="${company.websiteurl}" target="_blank"><img src="${company.imageurl}" alt="${company.name}"></a>
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
