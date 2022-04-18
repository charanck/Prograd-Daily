function navBarComponent() {
    const navBar = newElement(
        "nav",
        { class: "navbar navbar-expand-lg navbar-light bg-light" },
        "",
        ""
    );

    const sitename = newElement(
        "a",
        { class: "navbar-brand " },
        "Issue Tracker",
        ""
    );

    navBar.appendChild(sitename);
    const navItems = newElement(
        "div",
        { class: "collapse navbar-collapse", id: "navbarNav" },
        "",
        ""
    );

    const collapseButton = newElement("button", {
        class: "navbar-toggler",
        type: "button",
        "data-toggle": "collapse",
        "data-target": "#navbarNav"
    });
    const icon = newElement("span", { class: "navbar-toggler-icon" });
    collapseButton.appendChild(icon);
    navBar.appendChild(collapseButton);

    const homeNavItem = newElement(
        "a",
        {
            class: "nav-item nav-link btn btn-outline-primary m-1 btn-sm",
            href: ""
        },
        "Home",
        ""
    );
    navItems.appendChild(homeNavItem);

    const boardNavItem = newElement(
        "a",
        {
            class: "nav-item nav-link btn btn-outline-primary m-1 text-primary btn-sm"
        },
        "Board",
        ""
    );
    boardNavItem.addEventListener("click", (e) => boardComponent(e));
    navItems.appendChild(boardNavItem);

    if (!state.isFeedbackGiven) {
        const feedbackLinkItem = newElement(
            "a",
            {
                class: "nav-item nav-link btn btn-primary text-light m-1 btn-sm ml-auto"
            },
            "Feedback",
            ""
        );
        feedbackLinkItem.addEventListener("click", (e) => feedbackComponent());
        navItems.appendChild(feedbackLinkItem);
    }

    const adminLinkItem = newElement(
        "a",
        {
            class: "nav-item nav-link btn btn-primary text-light m-1 btn-sm ml-auto"
        },
        "Admin",
        ""
    );
    adminLinkItem.addEventListener("click", (e) =>{
    if(state.adminToken) adminFeedbacksComponent();
    else adminLoginComponent();
});
    navItems.appendChild(adminLinkItem);

    const logoutNavItem = newElement(
        "a",
        {
            class: "nav-item nav-link btn btn-danger text-light m-1 btn-sm ml-auto"
        },
        "Log out",
        ""
    );
    logoutNavItem.addEventListener("click", (e) => handleLogOut());
    navItems.appendChild(logoutNavItem);

    navBar.appendChild(navItems);
    return navBar;
}
