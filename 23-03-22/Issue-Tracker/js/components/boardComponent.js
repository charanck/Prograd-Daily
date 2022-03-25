function boardComponent (e) {
    e.preventDefault();
    if (!state.user) return (window.location.hash = "login");
    document.getElementById("app").innerHTML = "";
    document.getElementById("app").appendChild(navBarComponent());

    // Board container and boards;
    const boardContainer = newElement('div',{class:"d-flex",style:'width:100vw;min-height:100vh'},'','');

    const backlogBoard = newElement('div',{class:'border',style:"width:25vw;min-height:100vh;background-color:#EEDEDE"},"","");
    boardContainer.appendChild(backlogBoard);

    const inprogressBoard = newElement('div',{class:'border',style:"width:25vw;min-height:100vh;background-color:#DEECEE"},"","");
    boardContainer.appendChild(inprogressBoard);

    const onholdBoard = newElement('div',{class:'border',style:"width:25vw;min-height:100vh;background-color:#EDEEDE"},"","");
    boardContainer.appendChild(onholdBoard);
    
    const completedBoard = newElement('div',{class:'border',style:"width:25vw;min-height:100vh;background-color:#E2EEDE;"},"","");
    boardContainer.appendChild(completedBoard);

    document.getElementById("app").appendChild(boardContainer);

    // Issue Card
    Issue.getAllIssues().forEach(issue => {
        const cardContainer = newElement('div',{class:'card w-100 my-2 border-0',draggable:'true',style:'cursor:pointer'},"","");
        const cardHeader = newElement('div',{class:'card-header'},`${issue.getDescription()}`,"");
        cardContainer.appendChild(cardHeader);
        const cardTitle = newElement('li',{class:' card-title list-group-item'},`Assigned: ${issue.getAssignedTo().getUserName()}`,"");
        cardContainer.appendChild(cardTitle);

        if(issue.getStage() == 'backlog')backlogBoard.appendChild(cardContainer);
        if(issue.getStage() == 'inprogress')inprogressBoard.appendChild(cardContainer);
        if(issue.getStage() == 'onhold')onholdBoard.appendChild(cardContainer);
        if(issue.getStage() == 'completed')completedBoard.appendChild(cardContainer);

        cardContainer.addEventListener('dblclick',(e)=>editIssueComponent(issue));
    });
}