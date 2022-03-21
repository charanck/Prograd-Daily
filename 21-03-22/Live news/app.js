// State
const state = {
    country:"in",
    news: []
}

// Initial rendering
async function init(){
    state.news = await getNews();
    renderNews();
}
init();

// Event Listeners
document.getElementById("country").addEventListener("change",changeCountry);

// Event Handlers
function changeCountry(event){
    const currentCountry = document.getElementById("country").value;
    setCountry(currentCountry);
}

// Renderers
function renderNews(){
    const mainContainer = document.querySelector(".main-container");
    mainContainer.innerHTML = "";

    state.news.forEach(newsItem => {
        const newNews = createNewsElement(newsItem);
        mainContainer.appendChild(newNews);
    })
}

// Helpers
function createNewsElement(news){
    const item = document.createElement("div");
    item.setAttribute("class","item");

    const img = document.createElement("img");
    img.src = news.urlToImage;
    item.appendChild(img);

    const title =document.createElement("h2");
    title.textContent = news.title;
    title.setAttribute("class","news-title");
    item.appendChild(title);

    const content =document.createElement("p");
    title.textContent = news.title;
    title.setAttribute("class","news-content");
    item.appendChild(content);

    const readMore =document.createElement("button");
    readMore.textContent = "Read More"
    item.appendChild(readMore);

    return item;
}

async function setCountry(country){
    state.country = country;
    const newNews = await getNews();
    setNews(newNews);
}

function setNews(news){
    state.news = news;
    renderNews();
}

async function getNews(){
    const url = `https://newsapi.org/v2/top-headlines?country=${state.country}&apiKey=c24192cf67664042a97c5fdbcc0a58e9`;

    const news = await fetch(url)
    .then(res => res.json())
    .then(json => json.articles)
    .catch(err => alert(err));

    return news;
}

