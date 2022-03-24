const component = {
    home: homeComponent,
    login: loginComponent,
    register: registerComponent,
    singleIssue: singleIssueComponent,
    board: boardComponent
};

function homeComponent() {
    if (!state.user) return (window.location.hash = "login");
    document.getElementById("app").innerHTML = "";

    const div = newElement(
        "div",
        { class: "d-flex justify-content-center container" },
        "",
        ""
    );

    const table = newElement("table", { class: "table table-hover text-center" }, "", "");
    const headTr = newElement("tr", {class:'thead-dark'}, "", "");
    headTr.appendChild(newElement("th", {}, "S.no", ""));
    headTr.appendChild(newElement("th", {}, "Description", ""));
    headTr.appendChild(newElement("th", {}, "Priority", ""));
    headTr.appendChild(newElement("th", {}, "Stage", ""));
    headTr.appendChild(newElement("th", {}, "Assigned To", ""));
    table.appendChild(headTr);
    let sno = 1;
    Issue.getAllIssues().forEach((issue) => {
        const tr = newElement("tr", {}, "", "");
        tr.appendChild(newElement("td", {}, sno, ""));
        tr.appendChild(newElement("td", {}, issue.getDescription(), ""));
        tr.appendChild(newElement("td", {}, issue.getPriority(), ""));
        tr.appendChild(newElement("td", {}, issue.getStage(), ""));
        tr.appendChild(
            newElement("td", {}, issue.getAssignedTo().getUserName())
        );
        table.appendChild(tr);

        tr.addEventListener('mouseover',(e)=>{
            tr.style.backgroundColor = '#D3D3D3';
            tr.style.cursor = 'pointer';
        });
        tr.addEventListener('mouseout',(e)=> tr.style.backgroundColor = 'inherit')

        tr.addEventListener('click',(e)=> singleIssueComponent(issue));
        sno++;
    });

    div.appendChild(table);
    document.getElementById("app").appendChild(div);
}

function loginComponent() {
    if (state.user) return (window.location.hash = "home");
    const loginPage = newElement(
        "div",
        {
            class: "login-page"
        },
        "",
        ""
    );
    const loginContainer = newElement(
        "div",
        { class: "login-container" },
        "",
        ""
    );
    const form = newElement("form", {}, "", "");

    const usernameDiv = newElement("div", {}, "", "");
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
            required: "true"
        },
        "",
        ""
    );
    usernameDiv.appendChild(usernameInput);
    form.appendChild(usernameDiv);

    const passwordDiv = newElement("div", {}, "", "");
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
            required: "true"
        },
        "",
        ""
    );
    passwordDiv.appendChild(passwordInput);
    form.appendChild(passwordDiv);

    const btnDiv = newElement("div", {}, "", "");
    const loginBtn = newElement(
        "button",
        { type: "submit", id: "login-btn" },
        "Login",
        ""
    );
    loginBtn.addEventListener("click", handleLogin);
    btnDiv.appendChild(loginBtn);
    const registerBtn = newElement(
        "a",
        { href: "#register", id: "register-btn" },
        "Register",
        ""
    );
    btnDiv.appendChild(registerBtn);
    form.appendChild(btnDiv);

    loginContainer.appendChild(form);
    loginPage.appendChild(loginContainer);

    document.getElementById("app").innerHTML = "";
    document.getElementById("app").appendChild(loginPage);
}

function registerComponent() {
    document.getElementById("app").innerHTML = "<h1>Register Page</h1>";
}

function singleIssueComponent(issue) {
    window.location.hash = "issue"
    document.getElementById("app").innerHTML = "<h1>Single Issue Page</h1>" + issue.getId();
}

function boardComponent() {
    document.getElementById("app").innerHTML = "<h1>Board Page</h1>";
}

// Generate Html Components
function newElement(tag, attr, text, value) {
    let newElem = document.createElement(tag);

    for (let i in attr) {
        newElem.setAttribute(String(i), String(attr[String(i)]));
    }
    if (text) newElem.innerHTML = text;
    if (value) newElem.value = value;

    return newElem;
}

