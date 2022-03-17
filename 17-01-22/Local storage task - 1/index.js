// Event Listeners
document.querySelector("#set").addEventListener('click',handleSetItem);
document.querySelector("#get").addEventListener('click',handleGetItem);
document.querySelector("#delete").addEventListener("click",handleDeleteItem);
document.querySelector("#clear").addEventListener('click',handleClearItem);

// Event  handlers
function handleSetItem(event){
    const key = document.getElementById("key");
    const value = document.getElementById("value");
    localStorage.setItem(key.value,value.value);
    key.value = "";
    value.value = "";
    renderTable();
}

function handleGetItem(event){
    const key = document.getElementById("key");
    const value = localStorage.getItem(key.value);
    console.log(value)
    document.getElementById("value").value = value;
}

function handleDeleteItem(event){
    const key = document.getElementById("key");
    localStorage.removeItem(key.value);
    key.value = "";
    value.value = "";
    renderTable();

}

function handleClearItem(event){
    localStorage.clear();
    key.value = "";
    value.value = "";
    renderTable();

}

function renderTable(){
    const table = document.querySelector("#table");
    table.innerHTML = "";
    const headTr = document.createElement("tr");
    const headKey = document.createElement("th");
    const headValue = document.createElement("th");
    headKey.textContent = 'Key';
    headValue.textContent = 'Value';
    headTr.appendChild(headKey);
    headTr.appendChild(headValue);
    table.appendChild(headTr);

    for(let i=0;i<localStorage.length;i++){
        const tr = document.createElement("tr");
        const key = document.createElement("td");
        const value = document.createElement("td");
        key.textContent = localStorage.key(i);
        value.textContent = localStorage.getItem(localStorage.key(i));
        tr.appendChild(key);
        tr.appendChild(value);
        table.appendChild(tr);
    }
}

renderTable();;

