function alertComponent (message, status) {
    const alert = newElement(
        "div",
        {
            class: `alert alert-${status} alert-dismissible fade show`,
            role: "alert"
        },
        "",
        ""
    );
    alert.textContent = message;
    const button = newElement(
        "button",
        { class: "close", "data-dismiss": "alert", "aria-label": "close" },
        "",
        ""
    );
    const span = newElement("span", { "aria-hidden": "true" }, "", "");
    span.innerHTML = "&times;";
    span.addEventListener(
        "click",
        e => (document.querySelector("#app").style.filter = "none")
    );
    button.appendChild(span);
    alert.appendChild(button);
    document.body.appendChild(alert);
    alert.style.position = "fixed";
    alert.style.top = "20px";
    alert.style.left = `calc(50vw - ${alert.clientWidth / 2}px)`;
    alert.style.zIndex = "9";
    document.querySelector("#app").style.filter = "blur(5px)";
}