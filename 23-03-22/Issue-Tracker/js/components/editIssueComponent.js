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
    const deleteButton = newElement("button",{class:'btn btn-danger m-1'},"Delete","");
    deleteButton.addEventListener('click',(e)=> handleDeleteIssue(issue));
    if (state.user == issue.getCreatedBy() || state.user.getRole() == "lead")buttons.appendChild(deleteButton);
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
                    class: "toast ml-5 my-3 border p-1",
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