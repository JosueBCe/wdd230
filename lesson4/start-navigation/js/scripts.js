toggleMenu = () => {
    document.getElementById("primaryNav").classList.toggle("open");
    document.getElementById("hamburgerBtn").classList.toggle("open");

}
const button = document.getElementById("hamburgerBtn")

button.onclick = () => toggleMenu()

/* 
window.onresize = () => {if (window.innerWidth > 512) 
    mainnav.classList.toggle('responsive')}; */