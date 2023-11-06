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

let startMessage = document.querySelector("#start-message");

function addToBoard(e){
    e.preventDefault()
    nameEnter.remove()
    let count = 3;
    startMessage.textContent = "Game starting in "  + count + " seconds...";

    let countDown = setInterval(function() {
        count --;

        if (count < 0) {
            clearInterval(countDown);
            startGame();
        } else {
            startMessage.textContent = "Game starting in " + count + " seconds...";
        }
    }, 1000);

    document.querySelector("h1").remove();
}

function startGame () {
    startMessage.remove();
}
