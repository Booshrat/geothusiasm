const start = document.querySelector("#start");
const leaderBoard = document.querySelector("#leader-board");
start.addEventListener("click", buttonsToForm);
const nameEnter = document.querySelector("#player-name")

function buttonsToForm(e){
    start.remove()
    leaderBoard.remove()
    nameEnter.style.display = "block"
}

nameEnter.addEventListener("submit", addToBoard);

let startMessage = document.querySelector("#start-message")

function addToBoard(e){
    e.preventDefault()
    nameEnter.remove()
    startMessage.textContent = "Game Starting in 3"
}
