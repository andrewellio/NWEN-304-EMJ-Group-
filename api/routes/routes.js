const express = require('express');
const router = express.Router();
const Movie = require ('../models/Movie.js');
var controller = require("../controllers/movieController.js");

//Get all movies
router.get('/', controller.getAllMovies);

//Get a movie
router.get('/:id', controller.getMovieById);

//Add a movie
router.post('/', controller.addMovie);

//Delete a movie
router.delete('/:id', controller.deleteMovie);

//Edit a movie
router.patch('/:id', controller.editMovie);

module.exports = router;