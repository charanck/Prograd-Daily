function loginComponent () {
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
    form.appendChild(newElement('h3',{class:'text-center'},"Login",""));

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

    const btnDiv = newElement("div", { class: "form-group" }, "", "");
    const loginBtn = newElement(
        "button",
        { type: "submit", class: "btn btn-success m-1", id: "login-btn" },
        "Login",
        ""
    );
    loginBtn.addEventListener("click", handleLogin);
    btnDiv.appendChild(loginBtn);
    const registerBtn = newElement(
        "a",
        { class: "btn btn-primary text-light m-1", id: "register-btn" },
        "Register",
        ""
    );
    registerBtn.addEventListener('click',(e)=>registerComponent());
    btnDiv.appendChild(registerBtn);
    form.appendChild(btnDiv);

    loginContainer.appendChild(form);
    loginPage.appendChild(loginContainer);

    document.getElementById("app").innerHTML = "";
    document.getElementById("app").appendChild(loginPage);
}