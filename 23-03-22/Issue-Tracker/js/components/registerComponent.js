function registerComponent () {
    if (state.user) return (window.location.hash = "home");
    const loginPage = newElement(
        "div",
        {
            class: "login-page "
        },
        "",
        ""
    );
    const loginContainer = newElement(
        "div",
        { class: "login-container w-50 m-auto" },
        "",
        ""
    );
    const form = newElement("form", {}, "", "");
    form.appendChild(newElement('h3',{class:'text-center'},"Register",""));

    const usernameDiv = newElement("div", { class: "form-group" }, "", "");
    const usernameLabel = newElement(
        "label",
        { for: "username" },
        "UserName: ",
        ""
    );
    usernameDiv.appendChild(usernameLabel);
    const usernameInput = newElement(
        "input",
        {
            type: "text",
            id: "username",
            placeholder: "username",
            required: "true",
            class: "form-control"
        },
        "",
        ""
    );
    usernameDiv.appendChild(usernameInput);
    form.appendChild(usernameDiv);

    const passwordDiv = newElement("div", { class: "form-group" }, "", "");
    const passwordLabel = newElement(
        "label",
        { for: "password" },
        "PassWord: ",
        ""
    );
    passwordDiv.appendChild(passwordLabel);
    const passwordInput = newElement(
        "input",
        {
            type: "text",
            id: "password",
            placeholder: "password",
            required: "true",
            class: "form-control"
        },
        "",
        ""
    );
    passwordDiv.appendChild(passwordInput);
    form.appendChild(passwordDiv);

    const repeatPasswordDiv = newElement("div", { class: "form-group" }, "", "");
    const repeatPasswordLabel = newElement(
        "label",
        { for: "repeatpassword" },
        "Repeat PassWord: ",
        ""
    );
    repeatPasswordDiv.appendChild(repeatPasswordLabel);
    const repeatPasswordInput = newElement(
        "input",
        {
            type: "text",
            id: "repeatpassword",
            placeholder: "Repeat the password",
            required: "true",
            class: "form-control"
        },
        "",
        ""
    );
    repeatPasswordDiv.appendChild(repeatPasswordInput);
    form.appendChild(repeatPasswordDiv);

    const passWordHelp = newElement(
        "small",
        { class: "form-text text-muted" },
        "*Password should be 8 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter",
        ""
    );
    form.appendChild(passWordHelp);

    const role = newElement("div", { class: "form-group" }, "", "");
    const roleLabel = newElement("div", { for: "role" }, "Role:", "");
    role.appendChild(roleLabel);
    const rolesSelect = newElement('select',{class:"form-control",id:'role'},"","");
    fetch('https://my-json-server.typicode.com/charanck/db-json/roles')
    .then(res => res.json())
    .then(res =>{
        res.forEach(roleItem =>{
            const option = newElement("option", {}, roleItem,roleItem);
            rolesSelect.appendChild(option);
        });
        role.appendChild(rolesSelect);
    })
    .catch(err => alertComponent(err,"danger"));
    form.appendChild(role);

    const btnDiv = newElement("div", { class: "form-group" }, "", "");
    const backBtn = newElement(
        "button",
        { type: "submit", class: "btn btn-warning m-1", id: "back-btn" },
        "Back",
        ""
    );
    backBtn.addEventListener("click", (e)=>loginComponent());
    const registerBtn = newElement(
        "a",
        { href: "#register", class: "btn btn-primary m-1", id: "register-btn" },
        "Register",
        ""
    );
    registerBtn.addEventListener('click',(e)=>handleRegister());
    btnDiv.appendChild(registerBtn);
    btnDiv.appendChild(backBtn);
    form.appendChild(btnDiv);

    loginContainer.appendChild(form);
    loginPage.appendChild(loginContainer);

    document.getElementById("app").innerHTML = "";
    document.getElementById("app").appendChild(loginPage);
}