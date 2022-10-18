const router = require("express").Router();
const Movie = require("../models/Movie.model")
const Celebrity = require("../models/Celebrity.model");

// GET "/movies/create" ruta para renderizar el formulario
router.get("/create", (req, res, next) => {

    Celebrity.find()
    .then((celebritiesList) => {
        res.render("movies/new-movie.hbs", {celebritiesList})
    })
    .catch((err) => {
        next(err)
    })
})


// POST "/movies/create" ruta para coger la data 
router.post("/create", async (req, res, next) => {

    try{
        await Movie.create(req.body)
        res.redirect("/movies/movies-list")
    }
    catch (error) {
        next.error
    }
})



//GET "/movies/movies-list" => ruta para renderizar
router.get("/movies-list", (req, res, next) => {
    Movie.find()
    .then((moviesList) =>{
        res.render("movies/movies.hbs", {
        moviesList
        })
    })
    .catch((error) =>{
        next(error)
    })
})



module.exports = router;