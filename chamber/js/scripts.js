toggleMenu = () => {
    document.getElementById("primaryNav").classList.toggle("open");
    document.getElementById("hamburgerBtn").classList.toggle("open");

}
const button = document.getElementById("hamburgerBtn")

button.onclick = () => toggleMenu()


const d = new Date()
document.querySelector("#year").innerHTML = d.getFullYear();


const date = new Object (document.lastModified);
document.getElementById("updated").innerHTML =` Last Modification: ${date}`;

/* window.onresize = () => {if (window.innerWidth > 1024) 
    mainnav.classList.toggle('responsive')};  */