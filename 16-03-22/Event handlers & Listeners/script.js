const container = document.getElementsByClassName("container")[0];

const items = document.getElementsByClassName("item")

for(let i=0;i<items.length;i++){
    items[i].addEventListener("mouseover",mouseOver);
    items[i].addEventListener("mouseout",mouseOut);
}

function mouseOver(event){
    event.target.style.backgroundColor = "#f6f6f6";
}

function mouseOut(event){
    setTimeout(()=>{
        event.target.style.backgroundColor = "#333";
    },400);    
}

function handleMouseOver(element){
    element.style.backgroundColor = "#f6f6f6";
}

function handleMouseOut(element){
    setTimeout(()=>{
        element.style.backgroundColor = "#333";
    },400);    
}