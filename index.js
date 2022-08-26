const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const { Locations } = require("./locations");
const { Movies } = require("./movies");

require("dotenv").config();

const app = express();

const port = 5000;

app.use(cors());

app.use(bodyParser.json());

//Root route
app.get("/", (req, res) => {
  return res.json({ status: "Working", process: process.env });
});

//Get all locations
app.get("/locations", async (req, res) => {
  try {
    let allLocations = await Locations.find({});
    return res.json(allLocations);
  } catch (error) {
    console.log({ error });
  }

  return res.json([]);
});

//Get all movies
app.get("/movies", async (req, res) => {
  try {
    let allMovies = await Movies.find({}).populate("locations");
    return res.json(allMovies);
  } catch (error) {
    console.log({ error });
  }

  return res.json([]);
});

//Get single movie details
app.get("/movies/:id", (req, res) => {
  const { query } = req;
  return res.json({ query });
});

//Add Movie
app.post("/movies/", async (req, res) => {
  const { body } = req;

  const { movie_name, cast_name, language, genre, locations } = body;

  try {
    let movie = new Movies({
      movie_name,
      cast_name,
      language,
      genre,
      locations,
    });
    movie.save();
    return res.json({ status: "Success" });
  } catch (error) {
    console.log(error);
  }

  return res.json({ status: "Error", error: "Error in Adding Movie" });
});

//Update Movie
app.post("/movies/:id", async (req, res) => {
  const {
    params: { id },
    body,
  } = req;

  const { movie_name, cast_name, language, genre, locations } = body;

  try {
    await Movies.findByIdAndUpdate(id, {
      $set: { movie_name, cast_name, genre, language, locations },
    });

    return res.json({ status: "Success" });
  } catch (error) {
    console.log(error);
  }

  return res.json({ status: "Error", error: "Error in Updating Movie" });
});

const dbPassword = process.env.DB_PASS;
const dbUser = process.env.DB_USER;

const uri = `mongodb+srv://${dbUser}:${dbPassword}@cluster0.edfsh1y.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(uri, (error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("DB Connected, Starting Server");
    app.listen(port, () => {
      console.log("Api started at http://localhost:" + port);
    });
  }
});