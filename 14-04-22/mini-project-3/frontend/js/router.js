const router = (event) => {
    event.preventDefault();
    const url = window.location.hash.slice(1) || "/";
    route(url);
};

const route = (path)=>{
    if(path =='home' || path == '/') component.home();
    else if(path =='login') component.login();
    else if(path =='register') component.register();
    // else if(path =='singleIssue') component.singleIssue();
    else if(path =='board') component.board();
}