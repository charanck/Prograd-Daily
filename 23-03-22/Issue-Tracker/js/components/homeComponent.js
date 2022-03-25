function homeComponent () {
    issueTable();
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
                class: `card border-${stageColor} br-5 mx-3 mb-3 col-12 col-sm-12 col-md-5 col-lg-3`,
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
        " class="badgebadge-pill p-1 rounded badge-${priorityColor}">Priority - ${issue.getPriority()}</small>`,
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

function filterComponent () {
    const filter = newElement(
        "div",
        { class: "form-check container bg-light p-2 form-switch my-5 px-3" },
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
    const addButton = newElement('button',{class:'btn btn-success btn-sm float-right'},"Add Issue","");
    addButton.addEventListener('click',(e)=>addIssueComponent());
    filter.appendChild(filterInput);
    filter.appendChild(filterLabel);
    filter.appendChild(addButton);
    return filter;
}