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
  
  try {
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

//Edit a movie NEED TO IMPLEMENT CHECKING FOR ERRORS
exports.editMovie = async (req, res) => {
  if(req.body.title !== undefined) {
    var updatedMovie = await Movie.updateOne(
      { _id: req.params.id }, 
      { $set: {title: req.body.title} }
    );
  } 

  if(req.body.director !== undefined) {
    var updatedMovie = await Movie.updateOne(
      { _id: req.params.id }, 
      { $set: {director: req.body.director} }
    );
  }

  if(req.body.genres !== undefined) {
    var updatedMovie = await Movie.updateOne(
      { _id: req.params.id }, 
      { $set: {genres: req.body.genres} }
    );
  }
  
  if(req.body.actors !== undefined) {
    var updatedMovie = await Movie.updateOne(
      { _id: req.params.id }, 
      { $set: {actors: req.body.actors} }
    );
  }

  if(req.body.runtime !== undefined) {
    var updatedMovie = await Movie.updateOne(
      { _id: req.params.id }, 
      { $set: {runtime: req.body.runtime} }
    );
  }

  if(req.body.release !== undefined) {
    var updatedMovie = await Movie.updateOne(
      { _id: req.params.id }, 
      { $set: {release: req.body.release} }
    );
  }

  if(req.body.summary !== undefined) {
    var updatedMovie = await Movie.updateOne(
      { _id: req.params.id }, 
      { $set: {summary: req.body.summary} }
    );
  }

  if(req.body.ageRating !== undefined) {
    var updatedMovie = await Movie.updateOne(
      { _id: req.params.id }, 
      { $set: {ageRating: req.body.ageRating} }
    );
  }

  if(req.body.price !== undefined) {
    var updatedMovie = await Movie.updateOne(
      { _id: req.params.id }, 
      { $set: {price: req.body.price} }
    );
  }

  if(req.body.poster !== undefined) {
    var updatedMovie = await Movie.updateOne(
      { _id: req.params.id }, 
      { $set: {poster: req.body.poster} }
    );
  }

  if(req.body.trailer !== undefined) {
    var updatedMovie = await Movie.updateOne(
      { _id: req.params.id }, 
      { $set: {trailer: req.body.trailer} }
    );
  }
  const movie = await Movie.findById(req.params.id);
  res.json(movie);
};