const Movie = require ('../models/Movie.js');
const User = require ('../models/User.js');
const router = require('../routes/routes.js');
const jwt = require('jsonwebtoken');

//Register a user
exports.register = async(req, res) => {
  User.register(new User({name: req.body.name , email: req.body.email, username: req.body.usr}), req.body.psw, function(err, user) {
    if (err) {
      res.status(400).send('Invalid details');
    }
    res.send('You are now registered');
  });
}

//Login a user
exports.login = async(req, res) => {
  const user = await User.findOne({usr: req.usr, psw: req.psw});
  const token = jwt.sign({_id: user._id}, 'TOKENSECRET');
  res.header('jwt', token).send(token);
};


//Get all movies
exports.getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch(err) {
    res.status(500).send('Server Error');
  }
};

//Get a movie
exports.getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if(!movie) {
      res.status(400).send('Cannot find movie');
    }
    res.json(movie);
  } catch(err) {
    res.status(500).send('Server error');
  }
};

//Add a movie
exports.addMovie = async (req, res) => {
  const token = req.header('jwt');
  if(!token) {
    return res.status(401).send('Need a token');
  }

  try {
    const verified = jwt.verify(token, 'TOKENSECRET');
  } catch(err) {
    return res.status(400).send('Invalid Token');
  }

  const movie = new Movie({
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
    res.send('Added ' + savedMovie.title);
  } catch(err) {
    res.status(400).send('Invalid movie');
  }
};

//Delete a movie
exports.deleteMovie = async (req, res) => {
  const token = req.header('jwt');
  if(!token) {
    return res.status(401).send('Need a token');
  }

  try {
    const verified = jwt.verify(token, 'TOKENSECRET');
  } catch(err) {
    return res.status(400).send('Invalid Token');
  }

  try {
    const removedMovie = await Movie.remove({_id: req.params.id});
    if(!removedMovie) {
      res.send('Invalid movie');
    } else {
      res.send('Removed movie');
    }
    
  } catch(err) {
    res.status(500).send('Server error');
  } 
};


exports.editMovie = async (req, res) => {
  const token = req.header('jwt');
  if(!token) {
    return res.status(401).send('Need a token');
  }

  try {
    const verified = jwt.verify(token, 'TOKENSECRET');
  } catch(err) {
    return res.status(400).send('Invalid Token');
  }
  
  try {
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
    if(movie) {
      res.json(movie);
    } else {
      res.status(400).send('Invalid movie');
    }
    
  } catch(err) {
    res.status(500).send('Server error');
  }
};