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

        tr.addEventListener('dblclick',(e)=> singleIssueComponent(issue));
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
    document.getElementById("app").innerHTML = "";
    const container = newElement("div",{class:'container'},"","");
    const form = newElement('form',{id:issue.getId()},'','');

    // Description block
    const description = newElement('div',{class:'form-group'},"","")
    const descriptionLabel = newElement('label',{"for":'description'},'Description',"");
    description.appendChild(descriptionLabel);
    const descriptionInput = newElement('input',{class:'form-control','id':'description','placeholder':'Enter description'},'',issue.getDescription());
    description.appendChild(descriptionInput);
    const descriptionHelp = newElement('small',{class:'form-text text-muted'},"Describe the issue/feature requirements","");
    description.appendChild(descriptionHelp);
    form.appendChild(description);

    // Priority block
    const priority = newElement('div',{class:'form-group'},"","");
    const priorityLabel = newElement('label',{'for':'priority'},"Priority",'');
    priority.appendChild(priorityLabel);
    const prioritySelect = newElement('select',{class:'form-control','id':'priority'},'','');
    const highOption = newElement('option',{class:'text-danger'},'High','high')
    prioritySelect.appendChild(highOption);
    const mediumOption = newElement('option',{class:'text-warning'},'Medium','medium')
    prioritySelect.appendChild(mediumOption);
    const lowOption = newElement('option',{class:'text-success'},'Low','low')
    prioritySelect.appendChild(lowOption);
    priority.appendChild(prioritySelect);
    form.appendChild(priority);

    // Stage block
    const stage = newElement('div',{class:'form-group'},"","");
    const stageLabel = newElement('div',{'for':'stage'},"Stage",'');
    stage.appendChild(stageLabel);
    const stageSelect = newElement('select',{class:'form-control','id':'stage'},'','');
    const backlogStage = newElement('option',{},'BackLog','backlog');
    stageSelect.appendChild(backlogStage);
    const inprogressStage = newElement('option',{},"In Progress",'inprogress');
    stageSelect.appendChild(inprogressStage);
    const onholdStage = newElement('option',{},'On Hold','onhold');
    stageSelect.appendChild(onholdStage);
    const completedStage = newElement('option',{},'Completed','completed');
    stageSelect.appendChild(completedStage);
    stage.appendChild(stageSelect);
    form.appendChild(stage);

    // Assigned To block
    const assignedTo = newElement('div',{class:'form-group'},"","");
    const assignedToLabel = newElement('div',{'for':'assignedto'},"Assigned To",'');
    assignedTo.appendChild(assignedToLabel);
    const assignedToSelect = newElement('select',{class:'form-control','id':'assignedto'},'','');
    User.getAllUsers().forEach(user =>{
        const option = newElement('option',{},user.getUserName(),user.getUserName());
        if(user == issue.getAssignedTo()) option.setAttribute('selected','true');
        assignedToSelect.appendChild(option);
    });
    assignedTo.appendChild(assignedToSelect);
    form.appendChild(assignedTo);

    // CreatedBy block
    const createdBy = newElement('div',{class:'form-group'},"","");
    const createdByLabel = newElement('div',{'for':'createdby'},"Created By",'');
    createdBy.appendChild(createdByLabel);
    const createdByInput = newElement('input',{class:'form-control-plaintext'},"",issue.getCreatedBy().getUserName());
    createdBy.appendChild(createdByInput);
    form.appendChild(createdBy);

    // CreatedOn block
    const createdOn = newElement('div',{class:'form-group'},'','');
    const createdOnLabel = newElement('label',{'for':'createdon'},'Created On:','');
    createdOn.appendChild(createdOnLabel);
    const createdOnInput = newElement('input',{class:'form-control-plaintext'},"",`${issue.getCreatedOn().slice(0,10)} @ ${issue.getCreatedOn().slice(11,16)}`);
    createdOn.appendChild(createdOnInput);
    form.appendChild(createdOn);

    // Button blocks
    const buttons = newElement('div',{},"","");
    const saveButton = newElement('button',{class:'btn btn-success m-1'},'Save','');
    saveButton.addEventListener('click',(e) => handleEditSaveIssue(issue));
    buttons.appendChild(saveButton);
    const backButton = newElement('button',{class:'btn btn-warning m-1'},'Back','');
    backButton.addEventListener('click',(e)=>homeComponent());
    buttons.appendChild(backButton);
    form.appendChild(buttons)

    container.appendChild(form);
    document.getElementById("app").appendChild(container);
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

