const component = {
    home: homeComponent,
    login: loginComponent,
    register: registerComponent,
    singleIssue: editIssueComponent,
    board: boardComponent
};

function homeComponent () {
    issueTable();
}

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
        { href: "#register", class: "btn btn-primary m-1", id: "register-btn" },
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

function registerComponent () {
    document.getElementById("app").appendChild(navBarComponent());
    document.getElementById("app").innerHTML = "<h1>Register Page</h1>";
}

function editIssueComponent (issue) {
    document.getElementById("app").innerHTML = "";
    document.getElementById("app").appendChild(navBarComponent());
    const container = newElement(
        "div",
        { class: 'container border-bottom"' },
        "",
        ""
    );
    const form = newElement("form", { id: issue.getId() }, "", "");

    // Description block
    const description = newElement("div", { class: "form-group" }, "", "");
    const descriptionLabel = newElement(
        "label",
        { for: "description" },
        "Description",
        ""
    );
    description.appendChild(descriptionLabel);
    const descriptionInput = newElement(
        "input",
        {
            class: "form-control",
            id: "description",
            placeholder: "Enter description"
        },
        "",
        issue.getDescription()
    );
    if (
        !(state.user == issue.getCreatedBy()) &&
        !(state.user.getRole() == "lead")
    ) {
        descriptionInput.classList.add("form-control-plaintext");
        descriptionInput.setAttribute("readonly", "true");
    }
    description.appendChild(descriptionInput);
    const descriptionHelp = newElement(
        "small",
        { class: "form-text text-muted" },
        "Describe the issue/feature requirements",
        ""
    );
    description.appendChild(descriptionHelp);
    form.appendChild(description);

    // Priority block
    const priority = newElement("div", { class: "form-group" }, "", "");
    const priorityLabel = newElement(
        "label",
        { for: "priority" },
        "Priority",
        ""
    );
    priority.appendChild(priorityLabel);
    const prioritySelect = newElement(
        "select",
        { class: "form-control", id: "priority" },
        "",
        ""
    );
    if (
        !(state.user == issue.getCreatedBy()) &&
        !(state.user.getRole() == "lead")
    ) {
        prioritySelect.classList.add("form-control-plaintext");
        prioritySelect.setAttribute("disabled", "true");
    }
    const highOption = newElement(
        "option",
        { class: "text-danger" },
        "High",
        "high"
    );
    if (issue.getPriority() == "high")
        highOption.setAttribute("selected", "true");
    prioritySelect.appendChild(highOption);
    const mediumOption = newElement(
        "option",
        { class: "text-warning" },
        "Medium",
        "medium"
    );
    prioritySelect.appendChild(mediumOption);
    if (issue.getPriority() == "medium")
        mediumOption.setAttribute("selected", "true");
    const lowOption = newElement(
        "option",
        { class: "text-success" },
        "Low",
        "low"
    );
    prioritySelect.appendChild(lowOption);
    if (issue.getPriority() == "low")
        lowOption.setAttribute("selected", "true");
    priority.appendChild(prioritySelect);
    form.appendChild(priority);

    // Stage block
    const stage = newElement("div", { class: "form-group" }, "", "");
    const stageLabel = newElement("div", { for: "stage" }, "Stage", "");
    stage.appendChild(stageLabel);
    const stageSelect = newElement(
        "select",
        { class: "form-control", id: "stage" },
        "",
        ""
    );
    if (
        !(state.user == issue.getCreatedBy()) &&
        !(state.user.getRole() == "lead")
    ) {
        stageSelect.classList.add("form-control-plaintext");
        stageSelect.setAttribute("disabled", "true");
    }
    const backlogStage = newElement("option", {}, "BackLog", "backlog");
    if (issue.getStage() == "backlog")
        backlogStage.setAttribute("selected", "true");
    stageSelect.appendChild(backlogStage);
    const inprogressStage = newElement(
        "option",
        {},
        "In Progress",
        "inprogress"
    );
    if (issue.getStage() == "inprogress")
        inprogressStage.setAttribute("selected", "true");
    stageSelect.appendChild(inprogressStage);
    const onholdStage = newElement("option", {}, "On Hold", "onhold");
    if (issue.getStage() == "onhold")
        onholdStage.setAttribute("selected", "true");
    stageSelect.appendChild(onholdStage);
    const completedStage = newElement("option", {}, "Completed", "completed");
    if (issue.getStage() == "completed")
        completedStage.setAttribute("selected", "true");
    stageSelect.appendChild(completedStage);
    stage.appendChild(stageSelect);
    form.appendChild(stage);

    // Assigned To block
    const assignedTo = newElement("div", { class: "form-group" }, "", "");
    const assignedToLabel = newElement(
        "div",
        { for: "assignedto" },
        "Assigned To",
        ""
    );
    assignedTo.appendChild(assignedToLabel);
    const assignedToSelect = newElement(
        "select",
        { class: "form-control", id: "assignedto" },
        "",
        ""
    );
    if (
        !(state.user == issue.getCreatedBy()) &&
        !(state.user.getRole() == "lead")
    ) {
        assignedToSelect.classList.add("form-control-plaintext");
        assignedToSelect.setAttribute("disabled", "true");
    }
    User.getAllUsers().forEach(user => {
        const option = newElement(
            "option",
            {},
            user.getUserName(),
            user.getUserName()
        );
        if (user == issue.getAssignedTo())
            option.setAttribute("selected", "true");
        assignedToSelect.appendChild(option);
    });
    assignedTo.appendChild(assignedToSelect);
    form.appendChild(assignedTo);

    // CreatedBy block
    const createdBy = newElement("div", { class: "form-group" }, "", "");
    const createdByLabel = newElement(
        "div",
        { for: "createdby" },
        "Created By",
        ""
    );
    createdBy.appendChild(createdByLabel);
    const createdByInput = newElement(
        "input",
        { class: "form-control-plaintext" },
        "",
        issue.getCreatedBy().getUserName()
    );
    createdByInput.classList.add("form-control-plaintext");
    createdByInput.setAttribute("readonly", "true");
    createdBy.appendChild(createdByInput);
    form.appendChild(createdBy);

    // CreatedOn block
    const createdOn = newElement("div", { class: "form-group" }, "", "");
    const createdOnLabel = newElement(
        "label",
        { for: "createdon" },
        "Created On:",
        ""
    );
    createdOn.appendChild(createdOnLabel);
    const createdOnInput = newElement(
        "input",
        { class: "form-control-plaintext" },
        "",
        `${issue.getCreatedOn().slice(0, 10)} @ ${issue
            .getCreatedOn()
            .slice(11, 16)}`
    );
    createdOnInput.classList.add("form-control-plaintext");
    createdOnInput.setAttribute("readonly", "true");
    createdOn.appendChild(createdOnInput);
    form.appendChild(createdOn);

    // Button blocks
    const buttons = newElement("div", {}, "", "");
    const saveButton = newElement(
        "button",
        { class: "btn btn-success m-1" },
        "Save",
        ""
    );
    saveButton.addEventListener("click", e => handleEditSaveIssue(issue));
    if (state.user == issue.getCreatedBy() || state.user.getRole() == "lead")
        buttons.appendChild(saveButton);
    const backButton = newElement(
        "button",
        { class: "btn btn-warning m-1" },
        "Back",
        ""
    );
    backButton.addEventListener("click", e => homeComponent());
    buttons.appendChild(backButton);
    form.appendChild(buttons);

    container.appendChild(form);
    document.getElementById("app").appendChild(container);

    // Add comment form
    const addCommentContainer = newElement(
        "div",
        { class: "container mt-5" },
        "",
        ""
    );
    const addCommentForm = newElement("form", { class: "form-group" }, "", "");
    const addCommentLabel = newElement(
        "label",
        { for: "addcomment" },
        "Add Comment:",
        ""
    );
    addCommentForm.appendChild(addCommentLabel);
    const addCommentInput = newElement(
        "input",
        {
            class: "form-control",
            placeholder: "Add comment ...",
            id: "addcomment"
        },
        "",
        ""
    );
    addCommentForm.appendChild(addCommentInput);
    addCommentContainer.appendChild(addCommentForm);
    const addCommentButton = newElement(
        "button",
        { class: "btn btn-success" },
        "Comment",
        ""
    );
    addCommentButton.addEventListener("click", e => handleAddComment(issue));
    addCommentContainer.appendChild(addCommentButton);
    document.getElementById("app").appendChild(addCommentContainer);

    // Comment section
    const commentContainer = newElement(
        "div",
        { class: "container mt-5 bg-light p-3" },
        "",
        ""
    );
    const commentTitle = newElement("h3", {}, "Comments:", "");
    commentContainer.appendChild(commentTitle);
    Comment.getAllComments().forEach(comment => {
        if (comment.commentTo == issue) {
            const toast = newElement(
                "div",
                {
                    class: "toast ml-5 my-3",
                    role: "alert",
                    "aria-live": "assertive",
                    "aria-atomic": "true"
                },
                "",
                ""
            );
            const toastHeader = newElement(
                "div",
                { class: "toast-header" },
                "",
                ""
            );
            const img = newElement("img", {
                src: "./img/profile.jpg",
                class: "rounded",
                style: "width:2rem"
            });
            toastHeader.appendChild(img);
            const strong = newElement(
                "strong",
                { class: "mr-auto" },
                comment.getCommentedBy().getUserName(),
                ""
            );
            toastHeader.appendChild(strong);
            const small = newElement(
                "small",
                { class: "text-muted" },
                ` ${comment
                    .getCommentedOn()
                    .slice(0, 10)} @ ${comment.getCommentedOn().slice(11, 16)}`,
                ""
            );
            toastHeader.appendChild(small);
            const deleteButton = newElement(
                "button",
                { class: "btn btn-danger ml-5 float-right btn-sm" },
                "Delete",
                ""
            );
            deleteButton.addEventListener("click", e =>
                handleDeleteComment(comment, issue)
            );
            if (
                issue.getCreatedBy() == state.user ||
                state.user == comment.getCommentedBy()
            )
                toastHeader.appendChild(deleteButton);
            toast.appendChild(toastHeader);
            const toastBody = newElement(
                "div",
                { class: "toast-body" },
                comment.getComment(),
                ""
            );
            toast.appendChild(toastBody);
            commentContainer.appendChild(toast);
        }
    });
    document.getElementById("app").appendChild(commentContainer);
}

function boardComponent () {
    document.getElementById("app").innerHTML = "<h1>Board Page</h1>";
}

function alertComponent (message, status) {
    const alert = newElement(
        "div",
        {
            class: `alert alert-${status} alert-dismissible fade show`,
            role: "alert"
        },
        "",
        ""
    );
    alert.textContent = message;
    const button = newElement(
        "button",
        { class: "close", "data-dismiss": "alert", "aria-label": "close" },
        "",
        ""
    );
    const span = newElement("span", { "aria-hidden": "true" }, "", "");
    span.innerHTML = "&times;";
    span.addEventListener(
        "click",
        e => (document.querySelector("#app").style.filter = "none")
    );
    button.appendChild(span);
    alert.appendChild(button);
    document.body.appendChild(alert);
    alert.style.position = "fixed";
    alert.style.top = "20px";
    alert.style.left = `calc(50vw - ${alert.clientWidth / 2}px)`;
    alert.style.zIndex = "9";
    document.querySelector("#app").style.filter = "blur(5px)";
}

function navBarComponent () {
    const navBar = newElement(
        "nav",
        { class: "navbar navbar-expand-lg navbar-light bg-light" },
        "",
        ""
    );
    const sitename = newElement(
        "a",
        { class: "navbar-brand " },
        "Issue Tracker",
        ""
    );
    navBar.appendChild(sitename);
    const navItems = newElement(
        "div",
        { class: "navbar-nav d-flec justify-content-between w-100" },
        "",
        ""
    );
    const homeNavItem = newElement(
        "a",
        { class: "nav-item nav-link active", href: "" },
        "Home",
        ""
    );
    navItems.appendChild(homeNavItem);
    const logoutNavItem = newElement(
        "a",
        { class: "nav-item nav-link btn btn-danger text-light btn-sm " },
        "Log out",
        ""
    );
    logoutNavItem.addEventListener("click", e => handleLogOut());
    navItems.appendChild(logoutNavItem);
    navBar.appendChild(navItems);
    return navBar;
}

function filterComponent () {
    const filter = newElement(
        "div",
        { class: "form-check container form-switch my-5 px-3" },
        "",
        ""
    );
    const filterInput = newElement(
        "a",
        { class: "btn btn-primary btn-sm mx-3 text-light" },
        "Toggle",
        ""
    );
    filterInput.addEventListener("click", e => {
        handleToggleTableCardView(e);
    });
    const filterLabel = newElement(
        "label",
        { class: "form-check-label" },
        "Toggle Card/Table View",
        ""
    );
    filter.appendChild(filterInput);
    filter.appendChild(filterLabel);
    return filter;
}

function issueTable () {
    if (!state.user) return (window.location.hash = "login");
    document.getElementById("app").innerHTML = "";
    document.getElementById("app").appendChild(navBarComponent());
    document.getElementById("app").appendChild(filterComponent());
    const div = newElement(
        "div",
        { class: "d-flex justify-content-center container tableView" },
        "",
        ""
    );

    const table = newElement(
        "table",
        { class: "table table-hover text-center" },
        "",
        ""
    );
    const headTr = newElement("tr", { class: "thead-dark" }, "", "");
    headTr.appendChild(newElement("th", {}, "S.no", ""));
    headTr.appendChild(newElement("th", {}, "Description", ""));
    headTr.appendChild(newElement("th", {}, "Priority", ""));
    headTr.appendChild(newElement("th", {}, "Stage", ""));
    headTr.appendChild(newElement("th", {}, "Assigned To", ""));
    table.appendChild(headTr);
    let sno = 1;
    Issue.getAllIssues().forEach(issue => {
        const tr = newElement("tr", {}, "", "");
        tr.appendChild(newElement("td", {}, sno, ""));
        tr.appendChild(newElement("td", {}, issue.getDescription(), ""));
        tr.appendChild(newElement("td", {}, issue.getPriority(), ""));
        tr.appendChild(newElement("td", {}, issue.getStage(), ""));
        tr.appendChild(
            newElement("td", {}, issue.getAssignedTo().getUserName())
        );
        table.appendChild(tr);

        tr.addEventListener("mouseover", e => {
            tr.style.backgroundColor = "#D3D3D3";
            tr.style.cursor = "pointer";
        });
        tr.addEventListener(
            "mouseout",
            e => (tr.style.backgroundColor = "inherit")
        );

        tr.addEventListener("dblclick", e => editIssueComponent(issue));
        sno++;
    });

    div.appendChild(table);
    document.getElementById("app").appendChild(div);
}

function issueCard () {
    if (!state.user) return (window.location.hash = "login");
    document.getElementById("app").innerHTML = "";
    document.getElementById("app").appendChild(navBarComponent());
    document.getElementById("app").appendChild(filterComponent());
    // document.getElementById("app").appendChild(newElement('h1',{class:"cardView"},"CARD VIEW",""));

    const cardContainer = newElement(
        "div",
        { class: "container-fluid row justify-content-center" },
        "",
        ""
    );
    Issue.getAllIssues().forEach(issue => {
        let priorityColor;
        if (issue.getPriority() == "high") priorityColor = "danger";
        if (issue.getPriority() == "medium") priorityColor = "warning";
        if (issue.getPriority() == "low") priorityColor = "primary";

        let stageColor;
        if (issue.getStage() == "backlog") stageColor = "danger";
        if (issue.getStage() == "inprogress") stageColor = "primary";
        if (issue.getStage() == "onhold") stageColor = "warning";
        if (issue.getStage() == "completed") stageColor = "success";
        const card = newElement(
            "div",
            {
                class: `card border-${stageColor} mx-3 mb-3 col-12 col-sm-12 col-md-5 col-lg-3`,
                style:'cursor:pointer'
            },
            "",
            ""
        );
        const cardHeader = newElement(
            "div",
            {
                class: "card-header bg-transparent",
                style: "position: relative"
            },
            `ISSUE - ${issue.getId()} <small style=" position: absolute; 
                                                top: -5px;
                                                right: -5px; 
                                                box-shadow: 1px 1px 1px 1px #333;
        " class="badgebadge-pill rounded badge-${priorityColor}">Priority - ${issue.getPriority()}</small>`,
            ""
        );
        card.appendChild(cardHeader);
        const cardBody = newElement(
            "div",
            { class: `card-body border-${stageColor}` },
            "",
            ""
        );
        const cardTitle = newElement(
            "h5",
            { class: "card-title" },
            issue.getDescription(),
            ""
        );
        cardBody.appendChild(cardTitle);
        const stage = newElement(
            "li",
            { class: "list-group-item bg-transparent" },
            `Stage - ${issue.getStage()}`,
            ""
        );
        cardBody.appendChild(stage);
        const createdBy = newElement(
            "li",
            { class: "list-group-item bg-transparent" },
            `CreatedBy - ${issue.getCreatedBy().getUserName()}`,
            ""
        );
        cardBody.appendChild(createdBy);
        const assignedTo = newElement(
            "li",
            { class: "list-group-item bg-transparent" },
            `Assigned To - ${issue.getAssignedTo().getUserName()}`,
            ""
        );
        cardBody.appendChild(assignedTo);
        card.addEventListener("dblclick", e => editIssueComponent(issue));
        card.addEventListener(
            "mouseover",
            e => (card.style.boxShadow = ".2px .2px 3px 3px #333")
        );
        card.addEventListener("mouseout", e => (card.style.boxShadow = "none"));
        card.appendChild(cardBody);
        cardContainer.appendChild(card);
    });
    document.getElementById("app").appendChild(cardContainer);
}

// Generate Html Components
function newElement (tag, attr, text, value) {
    let newElem = document.createElement(tag);

    for (let i in attr) {
        newElem.setAttribute(String(i), String(attr[String(i)]));
    }
    if (text) newElem.innerHTML = text;
    if (value) newElem.value = value;

    return newElem;
}
