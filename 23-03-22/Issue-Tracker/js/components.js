const component = {
    home: homeComponent,
    login: loginComponent,
    register: registerComponent,
    singleIssue: editIssueComponent,
    board: boardComponent
};

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
