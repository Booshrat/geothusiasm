const express = require("express");
const fs = require("fs");
const cors = require("cors");
const logger = require("./logger");
const countries = require("./flags");
const scoreBoard = require("./scoreBoard.json");

//const countries = require(./countries)
const app = express();

app.use(cors());
app.use(express.json());
app.use(logger);

app.get("/", (req, res) => {
  res.send(
    `Hello geothusiasm - There are ${countries.length} countries available.`
  );
});

app.get("/countries", (req, res) => {
  res.send(countries);
});

app.get("/countries/random", (req, res) => {
  const randId = Math.floor(Math.random() * countries.length);
  res.send(countries[randId]);
});

app.get("/countries/:id", (req, res) => {
  const idx = req.params.id;

  if (idx <= 0 || idx > countries.length || isNaN(idx)) {
    res.status(404).send("Country not found!");
  } else {
    res.status(201).send(countries[idx - 1]);
  }
});

// let highScores = [];

/* app.post('/highscores', (req, res) => {
    const { name, score } = req.body;

    if (name && score) {
        highScores.push({ name, score });

        res.status(201).json({message: 'High score submitted!'});
    } else {
        res.status(400).json({ message: 'Invalid name or score' });
    }
}); */

app.post("/scoreboard", (req, res) => {
  const scoreData = req.body;
  scoreBoard.push(scoreData);
  //   if (name && score) {
  fs.writeFileSync("./scoreBoard.json", JSON.stringify(scoreBoard));
  res.status(201).json({ message: "High score submitted!" });
  //   } else {
  // res.status(400).json({ message: "Invalid name or score" });
  //   }
});

app.get("/scoreboard", (req, res) => {
  res.send(scoreBoard);
});

module.exports = app;
