
const list = document.getElementById("list")
const input = document.getElementById("favchap");
const button = document.querySelector('button');


button.addEventListener('click', () => {
    
    if (input.value.length === 0) {
        alert('Please select a Chapter as favorite')
    } else {
    const myFavChapt = input.value;
    input.value = '';

    const listChapt = document.createElement('li');
    const listText = document.createElement('div');
    const listBtn = document.createElement('button');

    listChapt.appendChild(listText);
    listText.textContent = myFavChapt;
    listChapt.appendChild(listBtn);
    listBtn.textContent = `❌ Remove "${myFavChapt}" `;
    list.appendChild(listChapt);

    listBtn.addEventListener('click', () => {
        list.removeChild(listChapt);
    });
    }
    input.focus();
});
let el = document.querySelector('button');
el.ariaLabel = "Delete button";

