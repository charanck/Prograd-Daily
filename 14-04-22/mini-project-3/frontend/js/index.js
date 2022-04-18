// Initial Setup
User.loadToMemory();
Issue.loadToMemory();
Comment.loadToMemory();

// State
let state = {
    user: null,
    isFeedbackGiven: false,
    adminToken: null,
    isRemaindedForFeedback: false,
    feedbacks:null,
};
if (JSON.parse(localStorage.getItem("state"))) {
    const x = JSON.parse(localStorage.getItem("state"));
    const tempUser = User.getAllUsers().filter(
        (user) => user.getUserName() == x.user?.userName
    )[0];
    state.user = tempUser;
    state.adminToken = x.adminToken;
    state.isFeedbackGiven = x.isFeedbackGiven;
    state.isRemaindedForFeedback = x.isRemaindedForFeedback;
}

function setUserState(user) {
    state.user = user;
    localStorage.removeItem("state");
    localStorage.setItem("state", JSON.stringify(state));
}

function setIsFeedbackGiven(isFeedbackGiven) {
    state.isFeedbackGiven = isFeedbackGiven;
    localStorage.removeItem("state");
    localStorage.setItem("state", JSON.stringify(state));
}

function setAdminToken(token) {
    state.adminToken = token;
    localStorage.removeItem("state");
    localStorage.setItem("state", JSON.stringify(state));
}

function setIsRemaindedForFeedback(isRemaindedForFeedback) {
    state.isRemaindedForFeedback = isRemaindedForFeedback;
    localStorage.removeItem("state");
    localStorage.setItem("state", JSON.stringify(state));
}

// Feedback suggestion feedback modal
const feedbackSuggestionModal = newElement("div", {}, "", "");

feedbackSuggestionModal.innerHTML = `
<div class="modal" id="feedbackSuggestionModal" tabindex="-1" role="dialog">
<div class="modal-dialog" role="document">
  <div class="modal-content">
    <div class="modal-header">
      <h5 class="modal-title">Feeedback?</h5>
    </div>
    <div class="modal-body">
      <p>Please give us feedback about the application</p>
    </div>
    <div class="modal-footer">
      <button type="button" id="yes" class="btn btn-primary">Yes</button>
      <button type="button" id="later" class="btn btn-secondary" data-dismiss="modal">Later</button>
    </div>
  </div>
</div>
</div>
`;

document.body.appendChild(feedbackSuggestionModal);

document
    .querySelector("#feedbackSuggestionModal #yes")
    .addEventListener("click", (e) => {
        feedbackComponent();
        document.getElementById("feedbackSuggestionModal").style.display =
            "none";
    });

document
    .querySelector("#feedbackSuggestionModal #later")
    .addEventListener("click", (e) => {
        document.getElementById("feedbackSuggestionModal").style.display =
            "none";
    });


function setFeedbacks(feedbacks){
    state.feedbacks = feedbacks;
}

if(state.adminToken){
    getFeedbacks();
}

async function getFeedbacks(){
    const feedbacks = (await (await fetch('http://localhost:3000/feedbacks',{
            method:"GET",
            headers:{
                "token":state.adminToken
            }
        })).json())
        setFeedbacks(feedbacks);
}

// Event Listeners
window.addEventListener("load", router);
window.addEventListener("hashchange", router);
