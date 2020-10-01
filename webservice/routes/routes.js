const express = require('express');
const router = express.Router();
const Movie = require ('../models/Movie.js')

//Get all movies
router.get('/', async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch(err) {
    res.json({ message: err });
  }
});

//Get a movie
router.get('/:id', async (req, res) => {
  try {
    const movie =  await Movie.findById(req.params.id);
    res.json(movie);
  } catch(err) {
    res.json({ message: err });
  }
});

//Add a movie
router.post('/', async (req, res) => {
  const movie = new Movie({
    id: req.body.id,
    title: req.body.title,
    director: req.body.director,
    genres: req.body.genres,
    actors: req.body.actors,
    runtime: req.body.runtime,
    release: req.body.release,
    summary: req.body.summary,
    ageRating: req.body.ageRating,
    price: req.body.price,
    poster: req.body.poster,
    trailer: req.body.trailer
  });
  
  try{
    const savedMovie = await movie.save();
    res.json(savedMovie);
  } catch(err) {
    res.json({ message: err });
  }
});

//Delete a movie
router.delete('/:id', async (req, res) => {
  try {
    const removedMovie = await Movie.remove({_id: req.params.id});
    res.json(removedMovie);
  } catch(err) {
    res.json({ message: err });
  }
  
})





module.exports = router;