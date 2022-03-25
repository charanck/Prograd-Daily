function boardComponent () {
    if (!state.user) return (window.location.hash = "login");
    document.getElementById("app").innerHTML = "";
    document.getElementById("app").appendChild(navBarComponent());

    // Board container and boards;
    const boardContainer = newElement(
        "div",
        { class: "d-flex", style: "width:100vw;min-height:100vh" },
        "",
        ""
    );

    const backlogBoard = newElement(
        "div",
        {
            class: "border backlog",
            style: "width:25vw;min-height:100vh;background-color:#EEDEDE"
        },
        "",
        ""
    );
    boardContainer.appendChild(backlogBoard);

    const inprogressBoard = newElement(
        "div",
        {
            class: "border inprogress",
            style: "width:25vw;min-height:100vh;background-color:#DEECEE"
        },
        "",
        ""
    );
    boardContainer.appendChild(inprogressBoard);

    const onholdBoard = newElement(
        "div",
        {
            class: "border onhold",
            style: "width:25vw;min-height:100vh;background-color:#EDEEDE"
        },
        "",
        ""
    );
    boardContainer.appendChild(onholdBoard);

    const completedBoard = newElement(
        "div",
        {
            class: "border completed",
            style: "width:25vw;min-height:100vh;background-color:#E2EEDE;"
        },
        "",
        ""
    );
    boardContainer.appendChild(completedBoard);

    document.getElementById("app").appendChild(boardContainer);

    // Issue Card
    Issue.getAllIssues().forEach(issue => {
        const cardContainer = newElement(
            "div",
            {
                class:
                    "card draggable w-100 my-2 border-0 text-white bg-secondary",
                draggable: "true",
                style: "cursor:all-scroll"
            },
            "",
            ""
        );
        const cardHeader = newElement(
            "div",
            { class: "card-header" },
            `${issue.getDescription()}`,
            ""
        );
        cardContainer.appendChild(cardHeader);
        const cardTitle = newElement(
            "li",
            { class: " card-title list-group-item text-white bg-secondary" },
            `Assigned: ${issue.getAssignedTo().getUserName()}`,
            ""
        );
        cardContainer.appendChild(cardTitle);

        if (issue.getStage() == "backlog")
            backlogBoard.appendChild(cardContainer);
        if (issue.getStage() == "inprogress")
            inprogressBoard.appendChild(cardContainer);
        if (issue.getStage() == "onhold")
            onholdBoard.appendChild(cardContainer);
        if (issue.getStage() == "completed")
            completedBoard.appendChild(cardContainer);

        cardContainer.addEventListener("dblclick", e =>
            editIssueComponent(issue)
        );

        // Drag and Drop Handlers
        cardContainer.addEventListener("dragend", e => {
            let oneRect = document
                .querySelector(".backlog")
                .getBoundingClientRect();
            let twoRect = document
                .querySelector(".inprogress")
                .getBoundingClientRect();
            let threeRect = document
                .querySelector(".onhold")
                .getBoundingClientRect();
            let fourRect = document
                .querySelector(".completed")
                .getBoundingClientRect();

            if (e.pageX > oneRect.right && e.pageX < twoRect.right) {
                issue.setStage('inprogress');
                Issue.save();
                const currentElement = e.target;
                document.querySelector(".inprogress").appendChild(currentElement);
            } else if (e.pageX > twoRect.right && e.pageX < threeRect.right) {
                issue.setStage('onhold');
                Issue.save();
                const currentElement = e.target;
                document.querySelector(".onhold").appendChild(currentElement);
            } else if (e.pageX > threeRect.right) {
                issue.setStage('completed');
                Issue.save();
                const currentElement = e.target;
                document.querySelector(".completed").appendChild(currentElement);
            } else {
                issue.setStage('backlog');
                Issue.save();
                const currentElement = e.target;
                document.querySelector(".backlog").appendChild(currentElement);
            }
            boardComponent();
        });
    });
}
