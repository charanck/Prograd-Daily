function handleLogin(event){
    event.preventDefault();
    const userName = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if(User.authenticate(userName,password)){
        const user = User.getAllUsers().filter(user => user.getUserName() == userName)[0];
        setUserState(user);
        homeComponent();        
        alertComponent('loggedIn successfully!!!','success');
    }else{
        loginComponent();
        alertComponent("Wrong Credentials!!!",'danger');
    }
}

function handleEditSaveIssue(issue){
    const description = document.getElementById('description').value;
    const priority = document.getElementById('priority').value;
    const stage = document.getElementById('stage').value;
    let assignedTo;
    User.getAllUsers().forEach(user => {
        if(user.getUserName() == document.getElementById('assignedto').value) assignedTo = user;
    });
    issue.setDescription(description);
    issue.setPriority(priority);
    issue.setStage(stage);
    console.log(stage);
    issue.setAssignedTo(assignedTo);
    Issue.save();
    editIssueComponent(issue);
    alertComponent("Changes Saved Successfully","success");
}

function handleAddComment(issue){
    const commentedBy = state.user;
    const commentTo = issue;
    const comment = document.getElementById("addcomment").value;
    const newComment = new Comment(null,comment,commentedBy,commentTo,null);
    editIssueComponent(issue);
    alertComponent("Comment added successfully","success");
}

function handleDeleteComment(comment,issue){
    Comment.delete(comment);
    editIssueComponent(issue);
    alertComponent("Comment Deleted Successsfully","warning");
}

function handleLogOut(){
    localStorage.removeItem('state');
    state.user = null;
    loginComponent();
}

function handleToggleTableCardView(e){
    if(document.querySelector('.tableView')) issueCard();
    else issueTable();
}