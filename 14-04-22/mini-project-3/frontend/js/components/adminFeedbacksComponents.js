function adminFeedbacksComponent() {
    document.getElementById("app").innerHTML = "";
    document.getElementById("app").appendChild(navBarComponent());

    let bundeledFeedbacks = [];
    const feedbacksWithUserDetails = state.feedbacks.filter(
        (feedback) => feedback.answeredByName != null
    );

    feedbacksWithUserDetails.forEach((feedback) => {
        const temp = buildFeedbacks(feedback);
        bundeledFeedbacks.push(temp);
    });

    const container = newElement("div", { class: "container" }, "", "");

    container.innerHTML = `
    <table class="table table-hover">
        <thead class="thead-dark">
            <tr>
                <th scope="col">Sn.No</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Feedback On</th>
            </tr>
        </thead>
        <tbody>
        </tbody>
    </table>
    `;
    document.getElementById("app").appendChild(container);
    let sno = 1;
    bundeledFeedbacks.forEach((bundeledFeedback) => {
        const row = `<tr onclick="openModal(${sno})">
        <td>${sno}</td>
            <td>${bundeledFeedback[2].answeredByName}</td>
            <td>${bundeledFeedback[2].answeredByEmail}</td>
            <td>${new Date(bundeledFeedback[0].answeredOn).toLocaleDateString()}</td>
        </tr>`
        document.querySelector('table tbody').innerHTML += row;
        document.querySelector('#app').innerHTML += `<div class="modal" id="${sno}">
        <div class="modal-dialog"  role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Feedback</h5>
                </div>
                <div class="modal-body">
                    <h4>${bundeledFeedback[0].question}</h4>
                    <p>${bundeledFeedback[0].answer}</p>
                    <hr>
                    <h4>${bundeledFeedback[1].question}</h4>
                    <p>${bundeledFeedback[1].answer}</p>
                    <hr>
                    <p>User's Name: ${bundeledFeedback[2].answeredByName}</p>
                    <p>User's Email: ${bundeledFeedback[2].answeredByEmail}</p>
                </div>
                <div class="modal-footer">
                    <button type="button" onclick='closeModal(${sno})' class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>`
        sno++;
    });

    // console.log(bundeledFeedbacks);
}

function buildFeedbacks(feedback) {
    const bundeledFeedback = [];
    let prev = feedback;
    while (prev) {
        bundeledFeedback.push(prev);
        prev = state.feedbacks.find(
            (feedbackItem) => feedbackItem._id == prev.dependentOn
        );
    }
    bundeledFeedback.reverse();
    return bundeledFeedback;
}

function openModal(id){
    document.getElementById(id).style.display = 'block';
}

function closeModal(id){
        document.getElementById(id).style.display = 'none';
}
