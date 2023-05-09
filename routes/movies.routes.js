const express = require("express");
const router = express.Router();

const Movie = require("../models/Movie.model.js");
const Celeb = require("../models/Celebrity.model.js");

//* GET "/movies/create" => formulario de añadir nuevas peliculas
router.get("/create", (req, res, next) => {
  Celeb.find()
    .select({ name: 1 })
    .then((allCelebs) => {
      console.log(allCelebs);
      res.render("movies/new-movie", { allCelebs });
    })
    .catch((err) => {
      next(err);
    });
});

//* POST "/movies/create" => recoger datos e insertar en la BD
router.post("/create", async (req, res, next) => {
  console.log(req.body);
  try {
    const { title, genre, plot,cast } = req.body;
    Movie.create({
        title,
        genre,
        plot,
        cast
    })
    res.redirect("/")
  } catch (err) {
    next(err);
  }
});

module.exports = router;
