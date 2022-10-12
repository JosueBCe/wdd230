
const list = document.getElementById("list")
const input = document.getElementById("favchap");
const button = document.querySelector('button');


button.addEventListener('click', () => {
    const myFavChapt = input.value;
    input.value = '';

    const listChapt = document.createElement('li');
    const listText = document.createElement('div');
    const listBtn = document.createElement('button');

    listChapt.appendChild(listText);
    listText.textContent = myFavChapt;
    listChapt.appendChild(listBtn);
    listBtn.textContent = `❌ Remove " ${myFavChapt} " `;
    list.appendChild(listChapt);

    listBtn.addEventListener('click', () => {
        list.removeChild(listChapt);
    });

    input.focus();
});


/* button.addEventListener("click", () => {
    const myItem = input.value;

    input.value = '';
    console.log(myItem)
   list.innerHTML += `
    <li>${myItem}
    <span>
        <button class="deleteBtn" type="submit">&#10060;</button>
    </span>
    </li>
    `
    const btn = document.document.querySelector('button');
    btn.addEventListener("click", () => {
       
    }
    )
})
 */