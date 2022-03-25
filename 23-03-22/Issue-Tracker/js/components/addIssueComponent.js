function addIssueComponent(){
    if (!state.user) return (window.location.hash = "login");
    document.getElementById("app").innerHTML = "";
    document.getElementById("app").appendChild(navBarComponent());

    const container = newElement(
        "div",
        { class: 'container border-bottom"' },
        "",
        ""
    );
    const form = newElement("form", {}, "", "");

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
        ""
    );
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
    const highOption = newElement(
        "option",
        { class: "text-danger" },
        "High",
        "high"
    );
    prioritySelect.appendChild(highOption);
    const mediumOption = newElement(
        "option",
        { class: "text-warning" },
        "Medium",
        "medium"
    );
    prioritySelect.appendChild(mediumOption);
    const lowOption = newElement(
        "option",
        { class: "text-success" },
        "Low",
        "low"
    );
    prioritySelect.appendChild(lowOption);
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
    const backlogStage = newElement("option", {}, "BackLog", "backlog");
    stageSelect.appendChild(backlogStage);
    const inprogressStage = newElement(
        "option",
        {},
        "In Progress",
        "inprogress"
    );
    stageSelect.appendChild(inprogressStage);
    const onholdStage = newElement("option", {}, "On Hold", "onhold");
    stageSelect.appendChild(onholdStage);
    const completedStage = newElement("option", {}, "Completed", "completed");
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
    User.getAllUsers().forEach(user => {
        const option = newElement(
            "option",
            {},
            user.getUserName(),
            user.getUserName()
        );
        assignedToSelect.appendChild(option);
    });
    assignedTo.appendChild(assignedToSelect);
    form.appendChild(assignedTo);


    // Button blocks
    const buttons = newElement("div", {}, "", "");
    const saveButton = newElement(
        "button",
        { class: "btn btn-success m-1" },
        "Save",
        ""
    );
    saveButton.addEventListener("click", e => {handleAddIssue(e)});
    const backButton = newElement(
        "button",
        { class: "btn btn-warning m-1" },
        "Back",
        ""
    );
    backButton.addEventListener("click", e => homeComponent());
    buttons.appendChild(saveButton);
    buttons.appendChild(backButton);
    form.appendChild(buttons);

    container.appendChild(form);
    document.getElementById("app").appendChild(container);
}