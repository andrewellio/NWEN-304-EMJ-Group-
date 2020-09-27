const Movie = require("../models/movie");


export.getDynamicMovieDetails = (req, res, next) => {
  id = req.params.id;
  movie = Movie.search(id);
  res.render("movie", {"pageTitle" : movie.title, "movie" : movie});
}









/*
function init() {
  loadMovies();
  printMovies();
}

function loadMovies(req, res, next) {
  console.log("hello");
  movieOperations.add(new movie(1, "Deadpool", "Tim Pool", ["action", "adventure", "comedy"], ["Ryan Reynolds", "Morena Baccarin", "T.J. Miller"], 108, 2016, 
  "A wisecracking mercenary gets experimented on and becomes immortal but ugly, and sets out to track down the man who ruined his looks.", 
  "R", 15));
}

function printMovie() {
  
}

function printMovies() {
  
}
*/