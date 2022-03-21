// State
const state = {
    genre:"",
    movies:[]
}

// State modifiers
async function setGenre(genre){
    state.genre = genre;
    const movies = await getMovies()
    setMovies(movies);
}

function setMovies(movies){
    state.movies = movies;
    renderMovies();
    console.log(state.movies);
}

// Initialization
async function init(){
    //Setting initial genre
    handleChangeGenre();
}

// Event Listeners
const genreInput = document.querySelector("#genre");
genreInput.addEventListener("change",handleChangeGenre);

// Event Handlers
function handleChangeGenre(event){
    setGenre(genreInput.value);
}

// Helper Functions
async function getMovies(){
    const URL = `https://api.themoviedb.org/3/movie/${state.genre}?api_key=ca4b280deb11984b158c7aa6a28581f7`;
    const IMAGEURL = `https://image.tmdb.org/t/p/w600_and_h900_bestv2/`;

    const movies = await fetch(URL)
                   .then(res => res.json())
                   .catch(err => console.log(err));

    for(let i=0;i<movies.results.length;i++){
        movies.results[i].imageURL = `${IMAGEURL}${movies.results[i]["poster_path"].substring(1)}`;
    }

    return movies.results;
}

function createMovie(movie){
    const item = document.createElement('div');
    item.className = 'item';

    const title =  document.createElement('h3');
    title.textContent = movie.original_title;
    title.className = 'title';
    item.appendChild(title);

    const releaseDate = document.createElement('p');
    releaseDate.textContent = movie['release_date'];
    releaseDate.className = "release-date";
    item.appendChild(releaseDate);

    const image = document.createElement('img');
    image.src = movie.imageURL;
    image.className = 'image';
    item.appendChild(image);
    
    const icons = document.createElement('div');
    icons.className = 'icons';

    const voteCount = document.createElement('p');
    const heartIcon = document.createElement('i');
    heartIcon.className = 'fa fa-heart';
    voteCount.appendChild(heartIcon);
    let tempcount = document.createTextNode(` ${movie['vote_count']}`);
    voteCount.appendChild(tempcount);
    icons.appendChild(voteCount);

    const popularity = document.createElement('p');
    const eyeIcon = document.createElement('i');
    eyeIcon.className = 'fa fa-eye';
    popularity.appendChild(eyeIcon);
    tempcount = document.createTextNode(` ${movie['popularity']}`);
    popularity.appendChild(tempcount);
    icons.appendChild(popularity);

    item.appendChild(icons);

    return item;
}

// Renderers
function renderMovies(){
    // YET TO IMPLEMENT
    const mainContainer = document.querySelector(".main-container");
    mainContainer.innerHTML = "";
    state.movies.forEach(movie =>{
        const item = createMovie(movie);
        mainContainer.appendChild(item);
    })
}

init();
