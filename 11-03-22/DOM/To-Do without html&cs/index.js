// Site initialisation
// link for Font
const fontStyle = newElement("link",{
    "href":"https://fonts.googleapis.com/css2?family=Raleway&display=swap","rel":"stylesheet"
})
document.head.appendChild(fontStyle);
setStyle(document.querySelector("*"),{
    "font-family": "'Raleway', sans-serif"
})

const mainContainer = document.querySelector(".to-do-container");
setStyle(mainContainer,{
    "width":"500px",
    "min-height":"700px",
    "margin":"auto",
    "background-color":"#333",
    "padding":"2rem",
    "border-radius":"2rem",
    "display":"flex",
    "flex-direction":"column",
    "align-items":"center"
})

// Site rendering
// Creating heading
const heading = newElement("h2",{},"To - Do List","");
setStyle(heading,{
    "color":"#f6f6f6"
})
mainContainer.appendChild(heading);

// Creating task input
const taskInput = newElement("input",{
    "id":"add-to-do",
    "type":"text",
    "placeholder":"Add new To-Do"
},"","");
setStyle(taskInput,{
    "width":"100%",
    "padding":"1rem",
    "border-radius":"1rem",
    "border":"none"
});
mainContainer.appendChild(taskInput);

// Creating Add button
const addButton = newElement("button",{
    "id":"add-btn"
},"Add","");
setStyle(addButton,{
    "padding":".5rem 1.5rem",
    "background-color":"#DFF8EB",
    "margin":"1rem",
    "border-radius":"1rem",
    "border":"none"
})
addButton.addEventListener("mouseover",(e)=>{
    setStyle(addButton,{
        "background-color":"rgb(88, 252, 88)",
        "box-shadow":"#f7f7f7 1px 1px 2px"
    })
});
addButton.addEventListener("mouseout",(e)=>{
    setStyle(addButton,{
        "background-color":"#DFF8EB",
        "box-shadow":"none"
    })
});
mainContainer.appendChild(addButton);

// Creating to-do-items container
const toDoList = newElement("div",{
    "class":"to-do-items"
})
setStyle(toDoList,{
    "color":"#fff",
    "width":"100%"
})
mainContainer.appendChild(toDoList);


// Component generator
function newElement(tag,attr,text,value){
    let newElem = document.createElement(tag);
    
    for(let i in attr){
        newElem.setAttribute(String(i),String(attr[String(i)]));
    }
    if(text)newElem.innerHTML= text;
    if(value)newElem.value = value;
    
    return newElem
}

function setStyle(element,attr){
    for(i in attr){
        element.style[String(i)] = String(attr[i]);
    }
    
}

// EventListeners

addButton.addEventListener("click",addTask);

// Event handelers
function addTask(e){

    if(taskInput.value === "")return;

    let item = document.createElement("div");
    item.setAttribute("class","item")
    setStyle(item,{
        "display": "flex",
        "justify-content": "space-between",
        "align-items": "center",
        "border-color": "#f7f7f7",
        "border-top": "0",
        "border-left": "0",
        "border-bottom": "2px",
        "border-right": "0",
        "border-style": "solid",
        "border-radius": ".2rem",
    })

    let p = document.createElement("p");
    p.textContent = taskInput.value;
    item.appendChild(p);

    let buttons = document.createElement("div");
    buttons.setAttribute("class","buttons");

    let completedButton = document.createElement("a");
    completedButton.setAttribute("class","completed");
    completedButton.innerHTML = "&#x2713;";
    setStyle(completedButton,{
        "color":"#1DE9B6",
        "font-size":"2rem"
    });
    completedButton.addEventListener("mouseover",(e)=>{
        setStyle(completedButton,{
            "color":"#14a782"    
        })
    });
    completedButton.addEventListener("mouseout",(e)=>{
        setStyle(completedButton,{
            "color":"#1DE9B6"
        })
    });
    completedButton.addEventListener("click",completeTask);
    buttons.appendChild(completedButton);

    let deleteButton = document.createElement("a");
    deleteButton.setAttribute("class","delete");
    deleteButton.innerHTML = "&#x2717;";
    setStyle(deleteButton,{
        "font-size": "2rem",
        "color":"#FF5252",
        "margin-left": ".3rem"
    });
    deleteButton.addEventListener("mouseover",(e)=>{
        setStyle(deleteButton,{
            "color":"#b64a4a"    
        })
    });
    deleteButton.addEventListener("mouseout",(e)=>{
        setStyle(deleteButton,{
            "color":"#FF5252"
        })
    });
    deleteButton.addEventListener("click",deleteTask);
    buttons.appendChild(deleteButton);

    item.appendChild(buttons);
    toDoList.appendChild(item);

    taskInput.value = "";
}

function deleteTask(e){
    let currentTask = e.target.parentNode.parentNode;
    currentTask.remove();
}

function completeTask(e){
    let currentTask = e.target.parentNode.parentNode.children[0];
    if(currentTask.style["text-decoration"] == "line-through"){
        setStyle(currentTask,{
            "text-decoration": "none"
        });
    }else{
        setStyle(currentTask,{
            "text-decoration": "line-through"
        });
    }
}