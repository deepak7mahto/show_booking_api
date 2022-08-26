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

// console.log({ uri });

mongoose.connect(uri, (error) => {
  if (error) {
    console.log(error);
  } else {
    addLocations();

    console.log("DB Connected, Starting Server");
    app.listen(port, () => {
      console.log("Api started at http://localhost:" + port);
    });
  }
});

async function addLocations() {
  try {
    const locations = await Locations.find({});
    console.log("Number of Locations Added ", locations.length);

    const movies = await Movies.find({});
    console.log("Number of Movies Added ", movies.length);

    // await Locations.deleteMany({});

    // let newLoc = new Locations({
    // 	timings: ["11:00am - 2:00pm", "1:00pm - 4:00pm", "5:00pm - 8pm"],
    // 	location: "Pacific Mall , Subhash Nagar",
    // 	price: 350,
    // 	theatre_name: "PVR Pacific",
    // });
    // newLoc.save();
  } catch (error) {
    console.log({ error });
  }
}
