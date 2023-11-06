
const express = require('express');
const cors = require("cors");
const logger = require("./logger");
const countries = require("./flags");

const app = express();

app.use(cors());
app.use(express.json())
app.use(logger);

app.get('/', (req, res) => {
    res.send("Welcome to geothusiasm")
})

app.get('/countries/:id', (req, res) => {
    const idx = req.params.id;

    if (idx <= 0 || idx > countries.length || isNaN(idx)) {
        res.status(404).send("Country not found!");
    } else {
        res.status(201).send(countries[idx - 1]);
    }
})

module.exports = app;
