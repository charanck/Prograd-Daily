function handleLogin(event){
    event.preventDefault();
    const userName = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if(User.authenticate(userName,password)){
        setUserState(userName);
        window.location.hash = 'home';
    }else{
        alert("Wrong Credential!!!");
    }
}