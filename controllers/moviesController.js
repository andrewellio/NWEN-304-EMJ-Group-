const Movie = require("../models/movie");

/*Placeholder movies for testing without mongodb*/

movie1 = new Movie(1, "Deadpool", "Tim Pool", ["action", "adventure", "comedy"], ["Ryan Reynolds", "Morena Baccarin", "T.J. Miller"], 108, 2016, 
"A wisecracking mercenary gets experimented on and becomes immortal but ugly, and sets out to track down the man who ruined his looks.", 
"R", 15);

movie2 = new Movie(2, "Deadpool 2", "David Leitch", ["action", "adventure", "comedy"], ["Ryan Reynolds, Josh Brolin, Morena Baccarin"], 119, 2018, 
"Foul-mouthed mutant mercenary Wade Wilson (a.k.a. Deadpool), brings together a team of fellow mutant rogues to protect a young boy with supernatural abilities from the brutal, time-traveling cyborg Cable.", 
"R", 10);
  
movie1.add();
movie2.add();
 
exports.getDynamicMovieDetails = (req, res, next) => {
  id = req.params.id;
  mov = Movie.search(id);
  console.log(mov.title);
  res.render("movie", {"pageTitle" : mov.title, "movie" : mov});
}

exports.getMoviesPage = (req, res, next) => {
  movieList = Movie.all();
  console.log(movieList[0].title);
  res.render("movieslist", {"movies" : movieList});
}