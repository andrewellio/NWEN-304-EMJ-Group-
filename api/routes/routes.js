const express = require('express');
const router = express.Router();
var controller = require("../controllers/movieController.js");
const passport = require("passport");

//Register
router.post('/register', controller.register);

//Login
router.post('/login', passport.authenticate('local'), controller.login);

//Get all movies
router.get('/movies', controller.getAllMovies);

//Get a movie
router.get('/movies/:id', controller.getMovieById);

//Add a movie
router.post('/movies', controller.addMovie);

//Delete a movie
router.delete('/movies/:id', controller.deleteMovie);

//Edit a movie
router.patch('/movies/:id', controller.editMovie);


module.exports = router;