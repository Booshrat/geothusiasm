
const express = require('express');
const cors = require("cors");
const logger = require("./logger");

//const countries = require(./countries)
const app = express();

app.use(cors());
app.use(express.json())
app.use(logger);

app.get('/', (req, res) => {
    res.send("Hello geothusiasm")
})

app.get('/countries', (req, res) => {
    res.send(countries)
})

app.get('/countries/random', (req, res) => {
    const randId = Math.floor(Math.random() * countries.length);
    res.send(countries[randId]);
})

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


module.exports = app;
