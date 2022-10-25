toggleMenu = () => {
    document.getElementById("primaryNav").classList.toggle("open");
    document.getElementById("hamburgerBtn").classList.toggle("open");

}
const button = document.getElementById("hamburgerBtn")

button.onclick = () => toggleMenu()


const d = new Date()


document.querySelector("#today-date").innerHTML = d.toLocaleDateString('en-uk', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

document.querySelector("#year").innerHTML = d.getFullYear();



const date = new Object (document.lastModified);
document.getElementById("updated").innerHTML =` Last Modification: ${date}`;



let day = d.getDay() 

function display () {
if (day != 1 && day != 2) {
    document.getElementById("myDIV").style.display = "none"
}
}

display()

function myFunction() {
    document.getElementById("myDIV").style.display = "none";
}


let imagesToLoad = document.querySelectorAll("img[data-src]");


const loadingImages = (img) => {
    img.setAttribute("src", img.getAttribute("data-src"));
    img.onload = () => {img.removeAttribute("data-src");}
}

if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((items, observer) => {
        items.forEach((item) => {
            if (item.isIntersecting) {
                loadingImages(item.target);
                observer.unobserve(item.target);
            }
        });
    });
    imagesToLoad.forEach((img) => {
        observer.observe(img);
    });
} else {
    imagesToLoad.forEach((img) => {
        loadingImages(img);
    });
}