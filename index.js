const express = require("express");
const mongoose = require("mongoose");

require("dotenv").config()

const app = express();

const port = 3000;

app.get("/", (req, res) => {
    return res.json({ status: "Working", "process": process.env })
});


app.get("/movies", (req, res) => {
    return res.json({ movies: [] })
})

app.get("/movies/:id", (req, res) => {

    const { query } = req;

    return res.json({ query })

});

const dbPassword = process.env.DB_PASS;
const dbUser = process.env.DB_USER;

const uri = `mongodb+srv://${dbUser}:${dbPassword}@cluster0.9xu7iyx.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(uri, (error) => {
    if (error) {
        console.log(error)
    } else {
        console.log("DB Connected, Starting Server");
        app.listen(port, () => {
            console.log("Api started at http://localhost:" + port)
        })
    }
})

