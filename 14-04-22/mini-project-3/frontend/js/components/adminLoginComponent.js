function adminLoginComponent() {
    document.getElementById("app").innerHTML = "";
    document.getElementById("app").appendChild(navBarComponent());
    const container = newElement("div", { class: "container" }, "", "");

    container.innerHTML = `
    <div class="admin-login-page "><div class="login-container w-50 m-auto"><form><h3 class="text-center">Admin Login</h3><div class="form-group"><label for="email">Email: </label><input type="text" id="email" placeholder="email" required="true" class="form-control"></div><div class="form-group"><label for="password">PassWord: </label><input type="text" id="password" placeholder="password" required="true" class="form-control"></div><div class="form-group"><button type="submit" class="btn btn-success m-1" id="login-btn">Login</button></div></form></div></div>
    `;
    document.getElementById("app").appendChild(container);

    document.querySelector('.admin-login-page #login-btn').addEventListener('click',(e)=>{
        e.preventDefault();
        handleAdminLogin();
    })

}
