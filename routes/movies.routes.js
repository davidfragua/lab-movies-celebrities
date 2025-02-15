const router = require("express").Router();
const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

// GET "/movies/create" ruta para renderizar el formulario
router.get("/create", (req, res, next) => {
  Celebrity.find()
    .then((celebritiesList) => {
      res.render("movies/new-movie.hbs", { celebritiesList });
    })
    .catch((err) => {
      next(err);
    });
});

// POST "/movies/create" ruta para coger la data
router.post("/create", async (req, res, next) => {
  try {
    await Movie.create(req.body);
    res.redirect("/movies/movies-list");
  } catch (error) {
    next.error;
  }
});

//GET "/movies/movies-list" => ruta para renderizar
router.get("/movies-list", (req, res, next) => {
  Movie.find()
    .then((moviesList) => {
      res.render("movies/movies.hbs", {
        moviesList,
      });
    })
    .catch((error) => {
      next(error);
    });
});

//GET "movies/:movieId" => renderizar a los detalles de la peli
router.get("/:movieId", (req, res, next) => {
  const { movieId } = req.params;

  Movie.findById(movieId)
    .populate("cast")
    .then((movie) => {
      res.render("movies/movie-details.hbs", {
        movie,
      });
    })
    .catch((error) => {
      next(error);
    });
});

//POST "movies/:movieId/delete" => borrar elementos
router.post("/:movieId/delete", (req, res, next) => {
  const { movieId } = req.params;

  Movie.findByIdAndRemove(movieId)
    .then(() => {
      res.redirect("/movies/movies-list");
    })
    .catch((error) => {
      next(error);
    });
});

//GET "movies/:id/edit" => ruta para para render el form de una pelicula
router.get("/:movieId/edit", async (req, res, next) => {
  const { movieId } = req.params;
  try {
    const getMovie = await Movie.findById(movieId).populate("cast");
    const celebritiesList = await Celebrity.find();
    res.render("movies/edit-movie.hbs", { getMovie, celebritiesList });
  } catch (error) {
    next(error);
  }
});

// POST "/movies/:movieId"
router.post("/:movieId/edit", async (req, res, next) => {
  const { movieId } = req.params;
  //console.log(req.body)
  Movie.findByIdAndUpdate(movieId, req.body)
    .then((response) => {
      res.redirect(`/movies/${movieId}`);
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
