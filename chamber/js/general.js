
let titl = document.title

if (titl === "Join") {
    let date = document.querySelector("#date")
    date.innerHTML = d

}


if (titl == "Discover") {
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


if (titl == "Thank You") {

    const lastPageVisited = document.referrer.slice(-12);
    if (lastPageVisited == "contact.html" || lastPageVisited == "d+my+Message") {
        document.getElementById("success-msg").innerHTML = "Message Successfully Sent!"
        document.getElementById("message").innerHTML = "Thanks for your Message"
        document.getElementById("information").innerHTML = "As soon our agents are online, We will try to answer you!"

    }
}