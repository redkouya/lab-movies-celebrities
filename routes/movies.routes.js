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
    const { title, genre, plot, cast } = req.body;
    Movie.create({
      title,
      genre,
      plot,
      cast,
    });
    res.redirect("/");
  } catch (err) {
    next(err);
  }
});

//* GET "/movies/movies" => listado de todas las peliculas de la BD
router.get("/movies", async (req, res, next) => {
  try {
    const allMovies = await Movie.find();
    // console.log("allMovies",allMovies)
    res.render("movies/movies", { allMovies });
  } catch (err) {
    next(err);
  }
});

//* GET "/movies/:id" => detalles de la pelicula, popular cast
router.get("/:id", async (req, res, next) => {
  try {
    console.log(req.params);
    const movieDetails = await Movie.findById(req.params.id).populate("cast");
    console.log(movieDetails);
    res.render("movies/movie-details", { movieDetails });
  } catch (err) {
    next(err);
  }
});

//* GET "/movies/:id/delete" => borrará una pelicula
router.post("/:id/delete", async (req, res, next) => {
  console.log("ENTRA POST");
  try {
    await Movie.findByIdAndDelete(req.params.id);
    res.redirect("/movies/movies");
  } catch (err) {
    next(err);
  }
});

//* GET "/movies/:id/edit" con map de celebrity para seleccion de option
router.get("/:id/edit", async (req, res, next) => {
  try {
    const oneMovie = await Movie.findById(req.params.id);
    console.log("oneMovie", oneMovie.cast);
    const allCelebs = await Celeb.find();
    let arrayCeleb=[]

    allCelebs.forEach((eachCeleb) => {
      oneMovie.cast.forEach((element,index) => {
        let eachCelebStr = eachCeleb._id.toString();        
        arrayCeleb.push(eachCeleb)

        if (eachCelebStr === element.toString()) 
        { //!checkea que las ids coincidan para marcarlas o no   
                
          arrayCeleb[arrayCeleb.length-1].selected=true         
        }
       
      });
      console.log("arrayCeleb",arrayCeleb)

    });
    res.render("movies/edit-movie", { oneMovie, arrayCeleb });
  } catch (err) {
    next(err);
  }

  // Movie.findById(req.params.id)
  //   //.populate("cast")
  //   .then((oneMovie) => {
  //     Celeb.find()
  //       .then((allCelebs) => {
  //         res.render("movies/edit-movie", { oneMovie, allCelebs });
  //       })
  //       .catch((err) => {
  //         next(err);
  //       });
  //   })
  //   .catch((err) => {
  //     next(err);
  //   });
});

//* POST "/movies/:id/edit"

router.post("/:id/edit", (req, res, next) => {
  const { title, genre, plot, cast } = req.body;

  Movie.findByIdAndUpdate(req.params.id, {
    title,
    genre,
    plot,
    cast,
  }).then(() => {
    console.log("pelicula actualizada");
    res.redirect("/movies/movies");
  });
});
module.exports = router;
