const Movie = require ('../models/Movie.js');

//Get all movies
exports.getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch(err) {
    res.json({ message: err });
  }
};

//Get a movie
exports.getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    res.json(movie);
  } catch(err) {
    res.json({ message: err });
  }
};

//Add a movie
exports.addMovie = async (req, res) => {
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
};

//Delete a movie
exports.deleteMovie = async (req, res) => {
  try {
    const removedMovie = await Movie.remove({_id: req.params.id});
    res.json(removedMovie);
  } catch(err) {
    res.json({ message: err });
  } 
};

//Edit a movie
exports.editMovie = async (req, res) => {
  try {
    const updatedMovie = await Movie.updateOne(
      { _id: req.params.id }, 
      { $set: {title: req.body.title} }
    );
    res.json(updatedMovie);
  } catch {
    res.json({ message: err })
  }
};