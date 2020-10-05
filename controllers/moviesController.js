const Movie = require("../models/movie");
const dbMovie = require("../dbmodels/Movie");

/*Placeholder movies for testing without mongodb*/

Movie.loadDB();

movie1 = new Movie(
  1,
  "Deadpool",
  ["Tim Miller"],
  ["Action", "Adventure", "Comedy"],
  ["Ryan Reynolds", "Morena Baccarin", "T.J. Miller"],
  108,
  2016,
  "A wisecracking mercenary gets experimented on and becomes immortal but ugly, and sets out to track down the man who ruined his looks.",
  "R16",
  15,
  "https://m.media-amazon.com/images/M/MV5BYzE5MjY1ZDgtMTkyNC00MTMyLThhMjAtZGI5OTE1NzFlZGJjXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_UY1200_CR85,0,630,1200_AL_.jpg",
  "https://www.youtube.com/embed/ONHBaC-pfsk"
);

movie2 = new Movie(
  2,
  "Deadpool 2",
  ["David Leitch"],
  ["Action", "Adventure", "Comedy"],
  ["Ryan Reynolds", "Josh Brolin", "Morena Baccarin"],
  119,
  2018,
  "Foul-mouthed mutant mercenary Wade Wilson (a.k.a. Deadpool), brings together a team of fellow mutant rogues to protect a young boy with supernatural abilities from the brutal, time-traveling cyborg Cable.",
  "R16",
  10,
  "https://m.media-amazon.com/images/M/MV5BNjk1Njk3YjctMmMyYS00Y2I4LThhMzktN2U0MTMyZTFlYWQ5XkEyXkFqcGdeQXVyODM2ODEzMDA@._V1_.jpg",
  "https://www.youtube.com/embed/D86RtevtfrA"
);

movie3 = new Movie(
  3,
  "Arrival",
  ["Denis Villeneuve"],
  ["Drama", "Mystery", "Sci-Fi"],
  [
    "Amy Adams",
    "Jeremy Renner",
    "Forest Whitaker",
    "Michael Stuhlbarg",
    "Tzi Ma",
  ],
  116,
  2016,
  "A linguist works with the military to communicate with alien lifeforms after twelve mysterious spacecraft appear around the world.",
  "M",
  10,
  "https://m.media-amazon.com/images/M/MV5BMTExMzU0ODcxNDheQTJeQWpwZ15BbWU4MDE1OTI4MzAy._V1_.jpg",
  "https://www.youtube.com/embed/tFMo3UJ4B4g"
);

movie1.add();
movie2.add();
movie3.add();

exports.getDynamicMovieDetails = async (req, res, next) => {
  Movie.loadDB();
  id = req.params.id;
  mov = Movie.search(id);
  res.render("movie", { pageTitle: mov.title, movie: mov });
};

exports.getMoviesPage = async (req, res, next) => {
  //movieList = Movie.all();
  movieList = Movie.allByTitle();
  res.render("movieslist", { movies: movieList });
};

exports.getSearchPage = async (req, res, next) => {
  //movieList = Movie.all();
  searchList = Movie.allByTitle();
  res.render("search", { movies: searchList });
};

exports.getHomePage = async (req, res, next) => {
  //movieList = Movie.all();
  featuredMovie = movie3;
  res.render("home", { movie: featuredMovie });
};

exports.addMovie = async (req, res, next) => {
  
  const dbmovie = new dbMovie({
    title: req.body.title,
    director: req.body.directors,
    genres: req.body.genres,
    actors: req.body.actors,
    runtime: req.body.runtime,
    release: req.body.year,
    summary: req.body.summary,
    ageRating: req.body.rating,
    price: req.body.price,
    poster: req.body.poster,
    trailer: req.body.trailer
  });
  
  try{
    const savedMovie = await dbmovie.save();

    uploadedMovie = new Movie(
      savedMovie._id,
      savedMovie.title,
      savedMovie.director,
      savedMovie.genres,
      savedMovie.actors,
      savedMovie.runtime,
      savedMovie.release,
      savedMovie.summary,
      savedMovie.ageRating,
      savedMovie.price,
      savedMovie.poster,
      savedMovie.trailer
    );
    uploadedMovie.add();

    console.log('Added movie: ' + savedMovie.title);
    res.redirect('upload');
  } catch(err) {
    console.log('error');
  }
};
