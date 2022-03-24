// Initial Setup
User.loadToMemory();
Issue.loadToMemory();
Comment.loadToMemory();

// State
let state = {
    user:null
}
if(JSON.parse(localStorage.getItem('state'))) state = JSON.parse(localStorage.getItem('state'));

function setUserState(user){
    state.user = user;
    localStorage.removeItem('state');
    localStorage.setItem('state',JSON.stringify(state));
}
// Event Listeners
window.addEventListener('load', router);
window.addEventListener('hashchange', router);



