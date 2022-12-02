
let titl = document.title


let dateSubmitted = document.querySelector("#date")





const url = "https://brotherblazzard.github.io/canvas-content/fruit.json";
    const form  = document.getElementById('order');
async function mainFresh() {
    try {
        //Fetch the Data from the API 
        const response = await fetch(url);
        if (response.ok) {
            // Make the data in json form
            const data = await response.json()
            console.log(data)
            // Adding options distrubuited between the 3 select options HTML elements
            document.getElementById("select-1").innerHTML =  displayOptions(data.slice(0,13))
            document.getElementById("select-2").innerHTML =  displayOptions(data.slice(13,27))
            document.getElementById("select-3").innerHTML =  displayOptions(data.slice(27,39))
   
            
            form.addEventListener('submit', (event) => {
            // handle the form data
                event.preventDefault()
                // userData = document.querySelectorAll("input,select")
                let inputs = Array.from(form.elements)
    
                const values = inputs.map(e => e.value)

                let askedFruits = values.slice(5,8)
                let nutritions = []
                data.map(e => askedFruits.includes(e.name) ? nutritions.push(e.nutritions) : e)
            
                console.log(askedFruits)
                console.log(nutritions)
                
                
                
                
            
                document.getElementById("submittedOrder").innerHTML += displayOrder(values)
                document.getElementById("nutrional-info").innerHTML += `<li> Calories: ${sumNutritions(nutritions, "calories")}</li>`
                document.getElementById("nutrional-info").innerHTML += `<li> Calories: ${sumNutritions(nutritions, "fat")}</li>`
                document.getElementById("nutrional-info").innerHTML += `<li> Carbohydrates: ${sumNutritions(nutritions, "carbohydrates")}</li>`
                document.getElementById("nutrional-info").innerHTML += `<li> Protein: ${sumNutritions(nutritions, "protein")}</li>`
                document.getElementById("nutrional-info").innerHTML += `<li> Sugar: ${sumNutritions(nutritions, "sugar")}</li>`
                
                document.getElementById("submittedOrder").innerHTML += d.toLocaleDateString('en-us', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        });


        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

mainFresh()

const displayOrder = (formValues) => {
    necessaryValues = [2,3,5,6,7]
    html = formValues.map((value,index) => necessaryValues.includes(index) ? `
    <li>${value}</li>`:""
    ).join("")

    return html
}


const sumNutritions = (nutrients, nutrient) => {
    sum = nutrients.reduce(function(sum, current) {
         return sum + current[`${nutrient}`];
       }, 0) 

    return sum
}

const displayOptions = (data) => {
    options = data.map((fruit, index) => `
    <option value="${fruit.name}"> ${fruit.name} </option>
    `
    ).join("")
    selectDefault = '<option value="please"> Select One Option </option>'
    return selectDefault + options
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

