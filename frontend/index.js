const axios = require('axios'); // allows to make HTTP requests from a web application.

async function randomFlag() {
    try {
        const response = await axios.get("https://geothusiasm-0gow.onrender.com/countries/random");
        const flag = response.data.flag;
        const fact = response.data.fact;

        const rightAnswer = response.data.country

        const wrongAnswers = await wrongCountries(rightAnswer);

        const answers = shuffle([wrongAnswers, rightAnswer]);

        console.log(flag);
        console.log('Right Answer:', rightAnswer);
        console.log('Wrong Answers:', wrongAnswers);

        //console.log(fact);

    } catch(error) {
        console.log(error)
    }
}
randomFlag();


async function wrongCountries(rightAnswer) {
    try {
        const response = await axios.get("https://geothusiasm-0gow.onrender.com/countries");

        const countries = response.data.filter(country => country !== rightAnswer);

        const shuffledCountries = shuffle(countries);
        return shuffledCountries.slice(0, 3);

    } catch(error) {
        console.log(error);
        return [];
    }
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;

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
