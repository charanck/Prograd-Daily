function feedbackComponent() {
    document.getElementById("app").innerHTML = "";
    document.getElementById("app").appendChild(navBarComponent());

    const container = newElement(
        "div",
        { class: 'container border-bottom"' },
        "",
        ""
    );

    const form = newElement("form", {}, "", "");

    // Do you like the application question block
    const question1 = newElement("div", { class: "form-group" }, "", "");
    const question1Label = newElement(
        "label",
        { for: "question1" },
        "Do you Like the application",
        ""
    );
    question1.appendChild(question1Label);

    const question1Input = newElement(
        "select",
        { class: "form-control" },
        "",
        ""
    );

    const question1AnsNull = newElement("option", {}, "", "");
    question1Input.appendChild(question1AnsNull);

    const question1AnsYes = newElement("option", {}, "Yes", "Yes");
    question1Input.appendChild(question1AnsYes);

    const question1AnsNo = newElement("option", {}, "No", "No");
    question1Input.appendChild(question1AnsNo);

    question1.appendChild(question1Input);
    question1.addEventListener("change", (e) => {
        if (e.target.value == "Yes") {
            yesQuestions();
        } else if (e.target.value == "No") {
            noQuestions();
        }
    });

    form.appendChild(question1);

    container.appendChild(form);

    document.getElementById("app").appendChild(container);
}

async function yesQuestions() {
    const feedback = {
        question: "Do you like the application?",
        answer: "Yes",
        dependentOn: null,
        answeredByName: null,
        answeredByEmail: null
    };
    const res = await fetch("http://localhost:3000/feedbacks", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(feedback)
    });

    const previousFeedbackId = (await res.json())._id;

    document.querySelector("form").innerHTML = "";

    const question2 = newElement("div", { class: "form-group" }, "", "");

    const question2Label = newElement(
        "label",
        {},
        "Tell what you like about the application",
        ""
    );

    question2.appendChild(question2Label);

    const question2Input = newElement(
        "input",
        {
            class: "form-control",
            placeholder: "Enter your feedback here...",
            id: "answer"
        },
        "",
        ""
    );

    const nextButtom = newElement(
        "button",
        { class: "btn btn-primary" },
        "Next",
        ""
    );
    nextButtom.addEventListener("click", (e) => {
        e.preventDefault();
        getYesUserInfo(previousFeedbackId);
    });

    question2.appendChild(question2Input);
    document.querySelector("form").appendChild(question2);
    document.querySelector("form").appendChild(nextButtom);
}

async function noQuestions() {
    const feedback = {
        question: "Do you like the application?",
        answer: "No",
        dependentOn: null,
        answeredByName: null,
        answeredByEmail: null
    };
    const res = await fetch("http://localhost:3000/feedbacks", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(feedback)
    });

    const previousFeedbackId = (await res.json())._id;

    document.querySelector("form").innerHTML = "";

    const question2 = newElement(
        'div',
        {class:'form-group'},
        "",
        ""
    );

    const question2Label = newElement(
        'label',
        {},
        "We are sorry to hear that how can we improve the experience",
        ""
    );

    question2.appendChild(question2Label);

    const question2Input = newElement(
        'select',
        {class:'form-control',id:"answer"},
        "",
        ""
    );

    question2Input.appendChild(newElement('option',{},"Contains outdated UI","Contains outdated UI"));

    question2Input.appendChild(newElement('option',{},"Missing a feature","Missing a feature"));

    question2Input.appendChild(newElement('option',{},"Difficult to use","Difficult to use"));

    question2Input.appendChild(newElement('option',{},"Performance related issue","Performance related issue"));
    question2.appendChild(question2Input);

    const next = newElement('button',{class:"btn btn-primary"},"Next","");
    next.addEventListener('click',(e)=>{
        e.preventDefault();
        getNoUserInfo(previousFeedbackId);
    })

    document.querySelector('form').appendChild(question2);
    document.querySelector('form').appendChild(next);


}

async function getYesUserInfo(previousFeedbackId) {
    const feedback = {
        question: "Tell what you like about the application?",
        answer: document.querySelector("#answer").value,
        dependentOn: previousFeedbackId,
        answeredByName: null,
        answeredByEmail: null
    };

    const res = await fetch("http://localhost:3000/feedbacks/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(feedback)
    });

    previousFeedbackId = (await res.json())._id;

    document.querySelector("form").innerHTML = "";

    const name = newElement("div", { class: "form-group" }, "", "");

    const nameLabel = newElement("label", {}, "Name: ", "");

    name.appendChild(nameLabel);

    const nameInput = newElement(
        "input",
        { class: "form-control", id: "name" },
        "",
        ""
    );

    name.appendChild(nameInput);
    document.querySelector("form").appendChild(name);

    const email = newElement("div", { class: "form-group" }, "", "");

    const emailLabel = newElement("label", {}, "Email: ", "");

    email.appendChild(emailLabel);

    const emailInput = newElement(
        "input",
        { class: "form-control", id: "email" },
        "",
        ""
    );

    email.appendChild(emailInput);

    document.querySelector("form").appendChild(email);

    const submit = newElement(
        "button",
        { class: "btn btn-success" },
        "Submit",
        ""
    );
    submit.addEventListener("click", async (e) => {
        e.preventDefault();
        const feedback = {
            question: "User details",
            answer: null,
            dependentOn: previousFeedbackId,
            answeredByName: document.getElementById("name").value,
            answeredByEmail: document.getElementById("email").value
        };
        const res = await fetch("http://localhost:3000/feedbacks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(feedback)
        });
        setIsFeedbackGiven(true);
        alertComponent("Thanks for your valuable feedback", "success");
        homeComponent();
    });

    document.querySelector("form").appendChild(submit);
}


async function getNoUserInfo(previousFeedbackId){
    const feedback = {
        question: "We are sorry to hear that how can we improve the experience",
        answer: document.querySelector("#answer").value,
        dependentOn: previousFeedbackId,
        answeredByName: null,
        answeredByEmail: null
    };

    const res = await fetch("http://localhost:3000/feedbacks/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(feedback)
    });

    previousFeedbackId = (await res.json())._id;

    document.querySelector("form").innerHTML = "";

    const name = newElement("div", { class: "form-group" }, "", "");

    const nameLabel = newElement("label", {}, "Name: ", "");

    name.appendChild(nameLabel);

    const nameInput = newElement(
        "input",
        { class: "form-control", id: "name" },
        "",
        ""
    );

    name.appendChild(nameInput);
    document.querySelector("form").appendChild(name);

    const email = newElement("div", { class: "form-group" }, "", "");

    const emailLabel = newElement("label", {}, "Email: ", "");

    email.appendChild(emailLabel);

    const emailInput = newElement(
        "input",
        { class: "form-control", id: "email" },
        "",
        ""
    );

    email.appendChild(emailInput);

    document.querySelector("form").appendChild(email);

    const submit = newElement(
        "button",
        { class: "btn btn-success" },
        "Submit",
        ""
    );
    submit.addEventListener("click", async (e) => {
        e.preventDefault();
        const feedback = {
            question: "User details",
            answer: null,
            dependentOn: previousFeedbackId,
            answeredByName: document.getElementById("name").value,
            answeredByEmail: document.getElementById("email").value
        };
        const res = await fetch("http://localhost:3000/feedbacks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(feedback)
        });
        setIsFeedbackGiven(true);
        alertComponent("Thanks for your valuable feedback", "success");
        homeComponent();
    });

    document.querySelector("form").appendChild(submit);
}