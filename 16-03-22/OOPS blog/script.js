class Blog{
    constructor(title,detail){
        this.title = title;
        this.detail = detail;
    }

    addTitle(){
        var title_card = document.createElement('h1');
        title_card.setAttribute("id","blog-title");
        title_card.textContent = this.title;
        document.getElementById('card-text').appendChild(title_card);
    }

    addDescription(){
        var description = document.createElement("p");
        description.setAttribute("id","log-description");
        description.textContent = this.detail;
        document.getElementById('card-text').appendChild(description);
    }
    
}

// EventListener

document.getElementById("addBlog").addEventListener("click",handleAddPop);
document.getElementById("close").addEventListener("click",closePopUp);
document.getElementById("post").addEventListener("click",addPost);


// Event Handlers
function handleAddPop(event){
    document.getElementById("popupContact").style.display = "block";
}

function closePopUp(event){
    document.getElementById("popupContact").style.display = "none";
}

function addPost(event){
    const newTitle = document.getElementById("title");
    const newDescription = document.getElementById("detail");
    const newBlog = new Blog(newTitle.value,newDescription.value);
    newTitle.value = "";
    newDescription.value = "";

    document.getElementById("close").click();

    newBlog.addTitle();
    newBlog.addDescription();
}