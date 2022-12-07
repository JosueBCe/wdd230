
// let titl = document.title

// Gets the date html element 
let dateSubmitted = document.querySelector("#date")
document.cookie = "witcher=Geralt; SameSite=None; Secure"
let ordersDiv = document.querySelector(".orders")
// Hide the orders section at the beginning 
ordersDiv.style.display = "none"


const url = "https://brotherblazzard.github.io/canvas-content/fruit.json";
const form = document.getElementById('order');


// Adapting Local Storage to be able to store list or arrays
Storage.prototype.setObj = function (key, obj) {
    return this.setItem(key, JSON.stringify(obj))
}
Storage.prototype.getObj = function (key) {
    return JSON.parse(this.getItem(key))
}

const displayOptions = (data) => {
    options = data.map((fruit, index) => `
    <option value="${fruit.name}"> ${fruit.name} </option>
    `
    ).join("")
    selectDefault = '<option value=""> Select One Option </option>'
    return selectDefault + options
}

let allOrders = document.querySelectorAll(".orders h3")
async function mainFresh() {
    try {
        //Fetch the Data from the API 
        const response = await fetch(url);
        if (response.ok) {

            // Make the data in json form
            const data = await response.json()


            // Adding options distrubuited between the 3 select options HTML elements
            document.getElementById("select-1").innerHTML = displayOptions(data.slice(0, 13))
            document.getElementById("select-2").innerHTML = displayOptions(data.slice(13, 27))
            document.getElementById("select-3").innerHTML = displayOptions(data.slice(27, 39))


            form.addEventListener('submit', (event) => {

                // handle the form data and prevents of updating the page
                event.preventDefault()

                // Gets the values of the Submitted Form 
                let inputs = Array.from(form.elements)
                const values = inputs.map(e => e.value)

                // Gets the number of the orders
                allOrders = document.querySelectorAll(".orders h3")

                // When a order is cancelled, the orders number is updated
                // allOrders.forEach((e, index) => {
                //     e.innerText = `Order #${index + 1}`
                //     e.parentNode.className = `order-${index + 1}`
                // })
            

                // Gets the amount of Orders
                let idOrder = Math.floor(Math.random() * 4000) + 1

                // Today's date
                let todaysDate = new Date().toLocaleDateString('en-us', { hour: "numeric", minute:"2-digit"});

                // Gets the fruits asked 
                let askedFruits = values.slice(5, 8)

                // Store in LS the orders in an array of arrays
                localStorage.setObj(`Order ${idOrder}`, askedFruits)

                // Take the fruits nutritions to calculate the total amount 
                let nutritions = []
                data.map(e => askedFruits.includes(e.name) ? nutritions.push(e.nutritions) : e)

             
                // Show the orders section 
                ordersDiv.style.display = "grid"
                console.log(values)
                // Shows One order with the user information and nutrients 
                ordersDiv.innerHTML += displayOrder(values, idOrder) + nutrientsSection(nutritions) + `<p> Order Date: ${todaysDate} </p>`
            
            });

        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

mainFresh()

const displayOrder = (formValues, idOrder) => {

    div = `<div  class="order-${idOrder}">
    <div  class="order-subtitle">
    <h3>Order #${idOrder}</h3>  
    <i class="close" onclick="cancelOrder(${idOrder})">❌</i>
    </div>
    <h4>Your Info.</h4>
    
    `
    necessaryValues = [1, 2, 3, 5, 6, 7]
    html = formValues.map((value, index) => necessaryValues.includes(index)
        ? `<li>${value}</li>`
        : index == 4 ? `<li class="subtitle"><strong>Mix's Ingridients</strong></li> `
            : index == 8 && value.trim().length > 0 ? `<li class="subtitle"><strong>Special Instructions:</strong><br> <br> ${value}</li>`
                : ""
    ).join("")

    return div + html
}


const updateLayout = (numOfChild) => 

numOfChild == 1 ? document.querySelector(".orders").style.display = "none" :
numOfChild >= 2 ? document.querySelector(".orders").style.display = "grid" : ""

const nutrientsSection = (nutritions) => {
    nutrientSection = `
    <div>
    <h4>Nutritional Information</h4>
    <ul>
    <li> Calories: ${sumNutritions(nutritions, "calories")}</li>
    <li> Fats: ${sumNutritions(nutritions, "fat").toFixed(2)}</li>
    <li> Carbohydrates: ${sumNutritions(nutritions, "carbohydrates").toFixed(2)}</li>
    <li> Protein: ${sumNutritions(nutritions, "protein").toFixed(2)}</li>
    <li> Sugar: ${sumNutritions(nutritions, "sugar").toFixed(2)}</li>
    </ul>
  
    </div>
    `
    return nutrientSection
}

const sumNutritions = (nutrients, nutrient) => {
    sum = nutrients.reduce(function (sum, current) {
        return sum + current[`${nutrient}`];
    }, 0)
    return sum
}



const cancelOrder = (orderNum) => {

    document.querySelector(`.order-${orderNum}`).remove()
    localStorage.removeItem(`Order ${orderNum}`)
    let numOfChild = ordersDiv.childElementCount;
    console.log(numOfChild)
    updateLayout(numOfChild)
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

