// Buttons & Elements
const addButton = document.getElementById("add-btn");
const inputTask = document.getElementById("add-to-do");
const toDoList = document.getElementsByClassName("to-do-items")[0];
const completedButtons = document.getElementsByClassName("completed");
const deleteButtons = document.getElementsByClassName("delete");

// Event listeners
addButton.addEventListener("click",addTask);
for(let i=0;i<completedButtons.length;i++){
    completedButtons[i].addEventListener("click",completeTask);
}
for(let i=0;i<deleteButtons.length;i++){
    deleteButtons[i].addEventListener("click",deleteTask);
}

// Handelers
function addTask(e){

    if(inputTask.value === "")return;

    let item = document.createElement("div");
    item.setAttribute("class","item")

    let p = document.createElement("p");
    p.textContent = inputTask.value;
    p.setAttribute("class","not-done")
    item.appendChild(p);

    let buttons = document.createElement("div");
    buttons.setAttribute("class","buttons");

    let completedButton = document.createElement("a");
    completedButton.setAttribute("class","completed");
    completedButton.innerHTML = "&#x2713;";
    completedButton.addEventListener("click",completeTask);
    buttons.appendChild(completedButton);

    let deleteButton = document.createElement("a");
    deleteButton.setAttribute("class","delete");
    deleteButton.innerHTML = "&#x2717;";
    deleteButton.addEventListener("click",deleteTask);
    buttons.appendChild(deleteButton);

    item.appendChild(buttons);
    toDoList.appendChild(item);

    inputTask.value = "";
}

function deleteTask(e){
    let currentTask = e.target.parentNode.parentNode;
    currentTask.remove();
}

function completeTask(e){
    let currentTask = e.target.parentNode.parentNode.children[0];
    if(currentTask.className == "done"){
        currentTask.setAttribute("class","not-done")
    }else{
        currentTask.setAttribute("class","done")
    }
}