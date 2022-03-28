function boardComponent () {
    if (!state.user) return (window.location.hash = "login");
    document.getElementById("app").innerHTML = "";
    document.getElementById("app").appendChild(navBarComponent());

    // Icon and title
    const iconContainer = newElement('div',{class:'d-flex sticky-top',style: "width:100vw;height:max-content;"},"","");
    const backlogIcon = newElement('h4',{class:'d-flex justify-content-center align-items-center p-1 text-center m-0',style:"width:25vw;background-color:#EEDEDE"},"","");
    backlogIcon.appendChild(newElement('svg',{style:'width:1.25rem',viewBox:'0 0 448 512'},`<path d="M320 64h-49.61C262.1 27.48 230.7 0 192 0S121 27.48 113.6 64H64C28.65 64 0 92.66 0 128v320c0 35.34 28.65 64 64 64h256c35.35 0 64-28.66 64-64V128C384 92.66 355.3 64 320 64zM192 48c13.23 0 24 10.77 24 24S205.2 96 192 96S168 85.23 168 72S178.8 48 192 48zM336 448c0 8.82-7.178 16-16 16H64c-8.822 0-16-7.18-16-16V128c0-8.82 7.178-16 16-16h18.26C80.93 117.1 80 122.4 80 128v16C80 152.8 87.16 160 96 160h192c8.836 0 16-7.164 16-16V128c0-5.559-.9316-10.86-2.264-16H320c8.822 0 16 7.18 16 16V448z"/>`,""));
    backlogIcon.innerHTML += ' Backlog';
    iconContainer.appendChild(backlogIcon);

    const inprogressIcon = newElement('h4',{class:'d-flex justify-content-center align-items-center p-1 text-center m-0',style:"width:25vw;background-color:#DEECEE"},"","");
    inprogressIcon.appendChild(newElement('svg',{style:'width:1.25rem',viewBox:'0 0 448 512'},`<path d="M464 64C490.5 64 512 85.49 512 112V176C512 202.5 490.5 224 464 224H48C21.49 224 0 202.5 0 176V112C0 85.49 21.49 64 48 64H464zM448 128H320V160H448V128zM464 288C490.5 288 512 309.5 512 336V400C512 426.5 490.5 448 464 448H48C21.49 448 0 426.5 0 400V336C0 309.5 21.49 288 48 288H464zM192 352V384H448V352H192z"/>`,""));
    inprogressIcon.innerHTML += ' In Progress';
    iconContainer.appendChild(inprogressIcon);

    const onholdIcon = newElement('h4',{class:'d-flex justify-content-center align-items-center p-1 text-center m-0',style:"width:25vw;background-color:#EDEEDE"},"","");
    onholdIcon.appendChild(newElement('svg',{style:'width:1.25rem',viewBox:'0 0 448 512'},`<path d="M272 63.1l-32 0c-26.51 0-48 21.49-48 47.1v288c0 26.51 21.49 48 48 48L272 448c26.51 0 48-21.49 48-48v-288C320 85.49 298.5 63.1 272 63.1zM80 63.1l-32 0c-26.51 0-48 21.49-48 48v288C0 426.5 21.49 448 48 448l32 0c26.51 0 48-21.49 48-48v-288C128 85.49 106.5 63.1 80 63.1z"/>`,""));
    onholdIcon.innerHTML += ' On Hold';
    iconContainer.appendChild(onholdIcon);

    const completedIcon = newElement('h4',{class:'d-flex justify-content-center align-items-center p-1 text-center m-0',style:"width:25vw;background-color:#E2EEDE"},"","");
    completedIcon.appendChild(newElement('svg',{style:'width:1.25rem',viewBox:'0 0 448 512'},`<path d="M182.6 246.6C170.1 259.1 149.9 259.1 137.4 246.6L57.37 166.6C44.88 154.1 44.88 133.9 57.37 121.4C69.87 108.9 90.13 108.9 102.6 121.4L159.1 178.7L297.4 41.37C309.9 28.88 330.1 28.88 342.6 41.37C355.1 53.87 355.1 74.13 342.6 86.63L182.6 246.6zM182.6 470.6C170.1 483.1 149.9 483.1 137.4 470.6L9.372 342.6C-3.124 330.1-3.124 309.9 9.372 297.4C21.87 284.9 42.13 284.9 54.63 297.4L159.1 402.7L393.4 169.4C405.9 156.9 426.1 156.9 438.6 169.4C451.1 181.9 451.1 202.1 438.6 214.6L182.6 470.6z"/>`,""));
    completedIcon.innerHTML += ' Completed';
    iconContainer.appendChild(completedIcon);


    document.getElementById("app").appendChild(iconContainer);

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
            e.preventDefault();
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
