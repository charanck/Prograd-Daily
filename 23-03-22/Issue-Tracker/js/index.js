// Initial Setup
User.loadToMemory();
Issue.loadToMemory();
Comment.loadToMemory();

// State
let state = {
    user:null
}
if(JSON.parse(localStorage.getItem('state'))){
    const x =JSON.parse(localStorage.getItem('state'));
    const tempUser = User.getAllUsers().filter(user => user.getUserName() == x.user.userName)[0];
    state.user = tempUser;
}

function setUserState(user){
    state.user = user;
    localStorage.removeItem('state');
    localStorage.setItem('state',JSON.stringify(state));
}
// Event Listeners
window.addEventListener('load', router);
window.addEventListener('hashchange', router);



