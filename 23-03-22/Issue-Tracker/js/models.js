class User {
    static users = [];
    constructor (id, userName, passWord,role) {
        this.setId(id);
        this._setUserName(userName);
        this._setPassWord(id,passWord);
        this.setRole(role);
        User.users.push(this);
        User.save();
    }

    setId (id) {
        if (id) this.id = id;
        else this._generateId();
    }

    _generateId () {
        this.id = Math.random()
            .toString(36)
            .slice(2);
    }

    getRole(){
        return this.role;
    }

    setRole(role){
        this.role = role;
    }

    getUserName () {
        return this.userName;
    }

    _setUserName (userName) {
        this.userName = userName;
    }

    _setPassWord (id,passWord) {
        if (id) this.passWord = passWord;
        else {
            this.passWord = this._generateHash(passWord);
        }
    }

    _generateHash(passWord){
        return  CryptoJS.MD5(passWord).toString();   
    }

    static authenticate (userName, passWord) {
        let isValid = false;
        User.getAllUsers().forEach(user => {
            if (user.userName == userName)
                isValid = user.passWord == CryptoJS.MD5(passWord).toString();
        });
        return isValid;
    }

    static getAllUsers () {
        return this.users;
    }

    static getUserById (id) {
        let currentUser = null;
        User.users.forEach(user => {
            if (user.id == id) currentUser = user;
        });
        return currentUser;
    }

    static save () {
        localStorage.removeItem("users");
        localStorage.setItem("users", JSON.stringify(User.getAllUsers()));
    }

    static loadToMemory () {
        const users = JSON.parse(localStorage.getItem("users"));
        users?.forEach(user => {
            new User(user.id, user.userName, user.passWord,user.role);
        });
    }
}

class Issue {
    static issues = [];

    constructor (
        id,
        description,
        priority,
        stage,
        assignedTo,
        createdBy,
        createdOn
    ) {
        this.setId(id);
        this.setDescription(description);
        this.setPriority(priority);
        this.setStage(stage);
        this.setAssignedTo(assignedTo);
        this.setCreatedBy(createdBy);
        this.setCreatedOn(createdOn);
        Issue.issues.push(this);
        Issue.save();
    }

    setId (id) {
        if (id) this.id = id;
        else this._generateId();
    }

    _generateId () {
        this.id = Math.random()
            .toString(36)
            .slice(2);
    }

    getId () {
        return this.id;
    }

    getDescription () {
        return this.description;
    }

    setDescription (description) {
        this.description = description;
    }

    getPriority () {
        return this.priority;
    }

    setPriority (priority) {
        const priorityList = { low: true, medium: true, high: true };
        if (priority.toLowerCase() in priorityList)
            this.priority = priority.toLowerCase();
        else this.priority = "low";
    }

    getStage () {
        return this.stage;
    }

    setStage (stage) {
        const stageList = {
            backlog: true,
            inprogress: true,
            onhold: true,
            completed: true
        };
        if (stage.toLowerCase() in stageList) this.stage = stage.toLowerCase();
        else this.stage = "backlog";
    }

    getAssignedTo () {
        return this.assignedTo;
    }

    setAssignedTo (assignedTo) {
        if (User.getAllUsers().includes(assignedTo))
            this.assignedTo = assignedTo;
        else this.assignedTo = null;
    }

    getCreatedOn () {
        return this.createdOn;
    }

    setCreatedOn (createdOn) {
        if (createdOn) this.createdOn = createdOn;
        else this.createdOn = new Date();
    }

    getCreatedBy () {
        return this.createdBy;
    }

    setCreatedBy (createdBy) {
        if (User.getAllUsers().includes(createdBy)) this.createdBy = createdBy;
        else this.createdBy = null;
    }

    static getAllIssues () {
        return Issue.issues;
    }

    static getIssueById (id) {
        let currentIssue = null;
        Issue.getAllIssues().forEach(issue => {
            if (issue.id == id) currentIssue = issue;
        });
        return currentIssue;
    }

    static save () {
        localStorage.removeItem("issues");
        localStorage.setItem("issues", JSON.stringify(Issue.getAllIssues()));
    }

    static delete (issue) {
        const currentIssueComments = Comment.getAllComments().filter(
            commentItem => commentItem.getCommentTo() == issue
        );
        currentIssueComments.forEach(comment => Comment.delete(comment));

        Issue.issues = Issue.getAllIssues().filter(
            issueItem => issueItem != issue
        );

        Issue.save();
    }

    static loadToMemory () {
        const issues = JSON.parse(localStorage.getItem("issues"));
        issues?.forEach(issue => {
            new Issue(
                issue.id,
                issue.description,
                issue.priority,
                issue.stage,
                User.getUserById(issue.assignedTo?.id),
                User.getUserById(issue.createdBy?.id),
                issue.createdOn
            );
        });
    }
}

class Comment {
    static comments = [];

    constructor (id, comment, commentedBy, commentTo, commentedOn) {
        this.setId(id);
        this.setComment(comment);
        this.setCommentedBy(commentedBy);
        this.setComentedOn(commentedOn);
        this.setCommentTo(commentTo);
        Comment.comments.push(this);
        Comment.save();
    }

    setId (id) {
        if (!id) this._generateId();
        else this.id = id;
    }

    _generateId () {
        this.id = Math.random()
            .toString(36)
            .slice(2);
    }

    getCommentTo () {
        return this.commentTo;
    }

    setCommentTo (commentTo) {
        if (Issue.getAllIssues().includes(commentTo))
            this.commentTo = commentTo;
        else this.commentTo = null;
    }

    getComment () {
        return this.comment;
    }

    setComment (comment) {
        this.comment = comment;
    }

    getCommentedBy () {
        return this.commentedBy;
    }

    setCommentedBy (commentedBy) {
        if (User.getAllUsers().includes(commentedBy))
            this.commentedBy = commentedBy;
        else this.commentedBy = null;
    }

    getCommentedOn () {
        return this.commentedOn;
    }

    setComentedOn (commentedOn) {
        if (!commentedOn) this.commentedOn = new Date().toISOString();
        else this.commentedOn = commentedOn;
    }

    static getAllComments () {
        return Comment.comments;
    }

    static getCommentById (id) {
        let currentComment = null;
        Comment.getAllComments().forEach(comment => {
            if (comment.id == id) {
                currentComment = comment;
            }
        });
        return currentComment;
    }

    static save () {
        localStorage.removeItem("comments");
        localStorage.setItem(
            "comments",
            JSON.stringify(Comment.getAllComments())
        );
    }

    static delete (comment) {
        Comment.comments = Comment.getAllComments().filter(
            commentItem => commentItem != comment
        );
        Comment.save();
    }

    static loadToMemory () {
        const comments = JSON.parse(localStorage.getItem("comments"));
        comments?.forEach(comment => {
            new Comment(
                comment.id,
                comment.comment,
                User.getUserById(comment.commentedBy?.id),
                Issue.getIssueById(comment.commentTo?.id),
                comment.commentedOn
            );
        });
    }
}
