const start = document.querySelector("#start");
const leaderBoard = document.querySelector("#leader-board");
start.addEventListener("click", buttonsToForm);
const nameEnter = document.querySelector("#player-name");

function buttonsToForm(e) {
  start.remove();
  leaderBoard.remove();
  nameEnter.style.display = "block";
}

nameEnter.addEventListener("submit", addToBoard);

let startMessage = document.querySelector("#start-message");

function addToBoard(e) {
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
  startMessage.remove();
  randomFlag();
  document.querySelector(".hero").style.backgroundColor = "rgba(0, 0, 0, 0.85)";
  document.querySelector("nav").style.backgroundColor = "rgba(0, 0, 0, 0.85)";
  startMessage.remove();
}

async function randomFlag() {
  try {
    const response = await fetch(
      "https://geothusiasm-0gow.onrender.com/countries/random"
    );
    const data = await response.json();

    document.querySelector("#guess-flag").style.display = "block";

    console.log(data.flag);
    const flag = data.flag;

    const flagImg = document.querySelector("#flag-img");
    flagImg.setAttribute("src", flag);

    const fact = data.fact;
    const rightAnswer = data.country;

    const wrongAnswers = await wrongCountries(rightAnswer);

    //const answers = shuffle([wrongAnswers, rightAnswer]);

    const answers = shuffle([
      wrongAnswers[0],
      wrongAnswers[1],
      wrongAnswers[2],
      rightAnswer,
    ]);

    const right = rightAnswer;

    //console.log(answers);

    function addToArray(answers) {
      ans.push(answers);
      rightAns.push(right)
    }
    answers.forEach(addToArray);

    //console.log(flag);
    console.log("Right Answer:", rightAnswer);
    console.log("Wrong Answers:", wrongAnswers);
    createButtons(ans);

    //console.log(fact);
  } catch (error) {
    console.log(error);
  }
}

let rightAns = [];
let ans = [];
//console.log(ans);
console.log(rightAns);

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
  section.appendChild(container);
}

function handleButtonClick(event) {
  const selectedAnswer = event.target.textContent;
  console.log("Selected Answer:", selectedAnswer);
 
  if (selectedAnswer === rightAns[0]) {
    event.target.style.backgroundColor = "green"
    console.log("You are correct!")
  } else {
    event.target.style.backgroundColor = "red"
    console.log("WRONG!")
  }
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
  console.log(e.key);
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});
