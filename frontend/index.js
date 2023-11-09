// const e = require("express");

const start = document.querySelector("#start");
const leaderBoard = document.querySelector("#leader-board");
start.addEventListener("click", buttonsToForm);
const nameEnter = document.querySelector("#player-name");
let score = 0;
const scoreDisp = document.querySelector("#score");
let playerName = "";

function buttonsToForm(e) {
  start.remove();
  leaderBoard.remove();
  nameEnter.style.display = "block";
}

nameEnter.addEventListener("submit", addToBoard);

let startMessage = document.querySelector("#start-message");

function addToBoard(e) {
  playerName = document.querySelector(".name-input").value;
  console.log(playerName);

  e.preventDefault();
  nameEnter.remove();
  let count = 3;
  startMessage.textContent = "Game starting in " + count + " seconds...";

  let countDown = setInterval(function () {
    count--;

    if (count < 0) {
      clearInterval(countDown);
      startGame();
    } else {
      if (count === 1) {
        startMessage.textContent = "Game starting in " + count + " second...";
      } else {
        startMessage.textContent = "Game starting in " + count + " seconds...";
      }
    }
  }, 1000);

  document.querySelector("#geo").remove();
}

function startGame() {
  scoreDisp.textContent = `Your Score is ${score}`;
  startMessage.remove();
  randomFlag();
  document.querySelector(".hero").style.backgroundColor = "rgba(0, 0, 0, 0.85)";
  document.querySelector("nav").style.backgroundColor = "rgba(0, 0, 0, 0.85)";
}

async function randomFlag() {
  try {
    const response = await fetch(
      "https://geothusiasm-0gow.onrender.com/countries/random"
    );
    const data = await response.json();

    console.log(data.flag);
    const flag = data.flag;

    const flagImg = document.querySelector("#flag-img");
    flagImg.setAttribute("src", flag);

    flagImg.onload = function () {
      // Only display the flag when the image is fully loaded
      document.querySelector("#guess-flag").style.display = "block";
    };
    const fact = data.fact;
    const rightAnswer = data.country;

    const wrongAnswers = await wrongCountries(rightAnswer);

    const answers = shuffle([
      wrongAnswers[0],
      wrongAnswers[1],
      wrongAnswers[2],
      rightAnswer,
    ]);

    const right = rightAnswer;

    rightAns = [];
    ans = [];

    function addToArray(answers) {
      ans.push(answers);
      rightAns.push(right);
    }
    answers.forEach(addToArray);

    console.log("Right Answer:", rightAnswer);
    console.log("Wrong Answers:", wrongAnswers);

    // const nextClicked = nextBtn.addEventListener("click", );

    createButtons(ans);

    nextBtn.style.display = "none";

    //console.log(fact);
  } catch (error) {
    console.log(error);
  }
}
//let wrongAns = [];
let rightAns = [];
let ans = [];

async function wrongCountries(rightAnswer) {
  try {
    const response = await fetch(
      "https://geothusiasm-0gow.onrender.com/countries"
    );
    const data = await response.json();
    //console.log(data.country)

    const countries = data
      .map((countryObj) => countryObj.country)
      .filter((country) => country !== rightAnswer);

    const shuffledCountries = shuffle(countries);
    return shuffledCountries.slice(0, 3);
  } catch (error) {
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
}

function createButtons() {
  const container = document.createElement("div");
  container.classList.add("button-container");

  const shuffleAnswers = shuffle(ans);

  shuffleAnswers.forEach((answer) => {
    const button = document.createElement("button");
    button.textContent = answer;
    button.addEventListener("click", handleButtonClick);
    container.appendChild(button);
  });

  const section = document.querySelector(".hero");

  // Clearing the previously appended (if any) button-container
  const child = document.querySelector(".button-container");

  if (child.parentNode) {
    child.parentNode.removeChild(child);
  }

  section.appendChild(container);
  // nextBtn.style.display = "none";
}
let wrongCounter = 0;
const restartButton = document.createElement("button");
const submitScoreButton = document.querySelector("#submit-score");

function handleButtonClick(event) {
  const selectedAnswer = event.target.textContent;
  const answerDisplay = document.querySelectorAll(".button-container button");
  const sectionOne = document.querySelector(".hero");
  console.log("Selected Answer:", selectedAnswer);

  nextBtn.style.display = "block";
  // Do something with the selected answer

  if (selectedAnswer === rightAns[0]) {
    event.target.style.backgroundColor = "green";
    console.log("You are correct!");
    score++;
    console.log(score);
    scoreDisp.textContent = `Your Score is ${score}`;
  } else {
    event.target.style.backgroundColor = "red";
    for (let country of answerDisplay) {
      if (country.textContent === rightAns[0])
        country.style.backgroundColor = "green";
    }
    wrongCounter++;
    console.log("WRONG!");
    if (wrongCounter === 3) {
      console.log("stop game");
      submitScoreButton.style.display = "block";
      restartButton.textContent = "Restart Game";
      nextBtn.style.display = "none";
      //sectionOne.append(submitScoreButton);

      restartButton.addEventListener("click", () => {
        console.log("Hi");
        restartGame();
      });
      sectionOne.append(restartButton);
    }
  }

  answerDisplay.forEach((button) => {
    button.disabled = true;
  });
}

function restartGame() {
  submitScoreButton.style.display = "none";
  score = 0;
  startGame();
  wrongCounter = 0;
  restartButton.remove();
}

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".close-modal");
const btnsOpenModal = document.querySelector(".help");

const openModal = function () {
  console.log("Button clicked");
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.addEventListener("click", openModal);
btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  //console.log(e.key);
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

const nextBtn = document.querySelector(".next-btn");
nextBtn.addEventListener("click", randomFlag);

async function addToScoreBoard(e) {
  console.log("Button clicked!");
  e.preventDefault();
  submitScoreButton.style.display = "none";
  const finalScore = {
    name: playerName,
    score: score,
  };
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(finalScore),
  };
  try {
    const response = await fetch(
      "https://geothusiasm-0gow.onrender.com/scoreboard",
      options
    );
    // Handle response here, e.g., updating the UI to show the scoreboard
  } catch (error) {
    // Handle any errors that occur during fetch
    console.error("Error submitting score:", error);
  }
}

submitScoreButton.addEventListener("click", addToScoreBoard);
console.log("Button click handler attached.");

const allScores = document.querySelector("#leader-scores");

async function retrieveScoreBoard() {
  try {
    const response = await fetch(
      "https://geothusiasm-0gow.onrender.com/scoreboard"
    );
    const data = await response.json();
    console.log(data);
    top10 = data.sort((a, b) => b.score - a.score);
    console.log(top10);
    const topScores = data.slice(0, 10);
    topScores.forEach((player) => {
      const listItem = document.createElement("li");
      listItem.textContent = `${player.name}: ${player.score}`;
      allScores.appendChild(listItem);
    });
  } catch (error) {
    console.log(error);
    return [];
  }
}
retrieveScoreBoard();

const board = document.querySelector(".board");
//const overlay = document.querySelector(".overlay");
//const btnCloseModal = document.querySelector(".close-modal");
const btnsOpenBoard = document.querySelector("#leader-board");
const btnCloseBoard = document.querySelector(".close-board");

const openBoard = function () {
  console.log("Button clicked");
  board.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

btnsOpenBoard.addEventListener("click", openBoard);
btnCloseBoard.addEventListener("click", closeBoard);
overlay.addEventListener("click", closeBoard);

document.addEventListener("keydown", function (e) {
  console.log(e.key);
  if (e.key === "Escape" && !board.classList.contains("hidden")) {
    closeBoard();
  }
});

function closeBoard() {
  board.classList.add("hidden");
  overlay.classList.add("hidden");
}

module.exports = {
  buttonsToForm, 
  addToBoard, 
  startGame, 
  randomFlag, 
  addToArray, 
  wrongCountries, 
  shuffle, 
  createButtons, 
  handleButtonClick, 
  restartGame
};
