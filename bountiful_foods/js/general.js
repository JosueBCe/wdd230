

let dateSubmitted = document.querySelector("#date")

// Hide the orders section at the beginning 
let ordersDiv = document.querySelector(".orders")
ordersDiv.style.display = "none"


const url = "https://brotherblazzard.github.io/canvas-content/fruit.json";

// Gets the form 
const form = document.getElementById('order');


// Adapting Local Storage to be able to store lists or arrays
Storage.prototype.setObj = function (key, obj) {
    return this.setItem(key, JSON.stringify(obj))
}
Storage.prototype.getObj = function (key) {
    return JSON.parse(this.getItem(key))
}

// Displaying the avaialable fruits to choose in the form
const displayOptions = (data) => {
    options = data.map((fruit, index) => `
    <option value="${fruit.name}"> ${fruit.name} </option>
    `
    ).join("")

    return options
}

async function mainFresh() {
    try {
        //Fetch the Data from the API 
        const response = await fetch(url);
        if (response.ok) {

            // Make the data in json form
            const data = await response.json()


            // Adding options distrubuited between the 3 select options HTML elements
            document.getElementById("select-1").innerHTML += displayOptions(data.slice(0, 13))
            document.getElementById("select-2").innerHTML += displayOptions(data.slice(13, 27))
            document.getElementById("select-3").innerHTML += displayOptions(data.slice(27, 39))


            form.addEventListener('submit', (event) => {

                // handle the form data and prevents of updating the page
                event.preventDefault()

                // Gets the values of the Submitted Form 
                let inputs = Array.from(form.elements)
                const values = inputs.map(e => e.value)

                // Generate a random Index for each order 
                let idOrder = Math.floor(Math.random() * 4000) + 1

                // Today's date
                let todaysDate = new Date().toLocaleDateString('en-us', { hour: "numeric", minute: "2-digit" });

                // Gets the fruits asked 
                let askedFruits = values.slice(5, 8)

                // Store in LS the orders in an array
                localStorage.setObj(`Order ${idOrder}`, askedFruits)

                // Take the fruits nutritions to calculate the total amount of each one
                let nutritions = []
                data.map(e => askedFruits.includes(e.name) ? nutritions.push(e.nutritions) : e)

                // Show the orders section 
                ordersDiv.style.display = "grid"


                // Shows the order with the user information and nutrients 
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

// Displays the submitted order as an order Ticket in the Orders Section 
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

// Make appear the Orders Section only if there's a child (at least 1 order), otherwise just make disapear the Orders Section
const updateLayout = (numOfChild) =>

    numOfChild == 1 ? document.querySelector(".orders").style.display = "none" :
        numOfChild >= 2 ? document.querySelector(".orders").style.display = "grid" : ""


// Return a HTML Formatted Section of ther calculated nutritions Total amount.
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

// Sum the same nutrients of different fruits and returns the total amount of them.
const sumNutritions = (nutrients, nutrient) => {
    sum = nutrients.reduce(function (sum, current) {
        return sum + current[`${nutrient}`];
    }, 0)
    return sum
}


// Cancels and remove a order when it's clicked in the ❌
const cancelOrder = (orderNum) => {
    document.querySelector(`.order-${orderNum}`).remove()
    localStorage.removeItem(`Order ${orderNum}`)
    let numOfChild = ordersDiv.childElementCount;
    console.log(numOfChild)
    updateLayout(numOfChild)
}

