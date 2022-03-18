function checkUserName(){
    const userNamePattern = /[a-zA-z]{8,15}/;
    const userName = document.querySelector("#usertext");
    return userNamePattern.test(userName.value)
}

function checkEmail(){
    const emailPattern = /\S+@\S+\.\S+/;
    const email = document.querySelector("#emailtext");
    return emailPattern.test(email.value);
}

function checkPassword(){
    const passwordPattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    const password = document.querySelector("#passwordtext");
    return passwordPattern.test(password.value);
}


document.getElementById("submit").addEventListener("click",handleSubmit);

function handleSubmit(event){
    event.preventDefault();
    console.log("Email: ",checkEmail());
    console.log("Password: ",checkPassword());
    console.log("Username: ",checkUserName());
}