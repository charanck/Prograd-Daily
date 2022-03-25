function boardComponent (e) {
    e.preventDefault();
    if (!state.user) return (window.location.hash = "login");
    document.getElementById("app").innerHTML = "";
    document.getElementById("app").appendChild(navBarComponent());
    document.getElementById("app").innerHTML += "<h1>Board Page</h1>";
}