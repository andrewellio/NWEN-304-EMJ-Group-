const Movie = require("../models/movie");

/*Placeholder movies for testing without mongodb*/

movie1 = new Movie(
  1,
  "Deadpool",
  "Tim Miller",
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
  "David Leitch",
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
  "Denis Villeneuve",
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

exports.getDynamicMovieDetails = (req, res, next) => {
  id = req.params.id;
  mov = Movie.search(id);
  res.render("movie", { pageTitle: mov.title, movie: mov });
};

exports.getMoviesPage = (req, res, next) => {
  //movieList = Movie.all();
  movieList = Movie.allByTitle();
  console.log(movieList);
  res.render("movieslist", { movies: movieList });
};
