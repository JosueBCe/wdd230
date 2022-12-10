

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


// Close the meeting message when the user clicks
function myFunction() {
    document.getElementById("meeting-message").style.display = "none";
}

// Applies lazy loading to images 
let images_1 = document.querySelectorAll("img[data-src]");
let images_2 = document.querySelectorAll("source[srcset]");

images_2.forEach(e => e.setAttribute('loading', 'lazy'))

const lazyLoading = (imagesToLoad) => {
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
}

lazyLoading(images_1)

