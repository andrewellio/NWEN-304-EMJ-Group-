const Movie = require("../models/movie");
const dbMovie = require("../dbmodels/Movie");

Movie.loadDB();

exports.getDynamicMovieDetails = (req, res, next) => {
  id = req.params.id;
  mov = Movie.search(id);
  res.render("movie", { pageTitle: mov.title, movie: mov });
};

exports.getMoviesPage = (req, res, next) => {
  movieList = Movie.allByTitle();
  res.render("movieslist", { movies: movieList });
};

exports.getSearchPage = (req, res, next) => {
  searchList = Movie.allByTitle();
  res.render("search", { movies: searchList });
};

exports.getHomePage = (req, res, next) => {
  featuredMovie = Movie.getLatest();
  //featuredMovie = Movie.search("5f7c0b617fbd2800a89ea326");
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
    trailer: req.body.trailer,
  });

  try {
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
    res.redirect("/upload");
    console.log("Added: " + savedMovie.title);
  } catch (err) {
    console.log("error");
  }
};

exports.removeMovie = async (req, res, next) => {
  const removedMovie = await dbMovie.deleteOne({ _id: req.params.id });
  Movie.delete(req.params.id);
  res.redirect("/movieslist");
  console.log("Removed: " + req.params.id);
};

exports.editMovie = async (req, res, next) => {
  toEdit = Movie.search(req.params.id);

  //DB update
  await dbMovie.updateOne(
    { _id: req.params.id },
    {
      $set: {
        title: req.body.newTitle,
        director: req.body.newDirectors,
        genres: req.body.newGenres,
        actors: req.body.newActors,
        runtime: req.body.newRuntime,
        release: req.body.newYear,
        summary: req.body.newSummary,
        ageRating: req.body.newRating,
        price: req.body.newPrice,
        poster: req.body.newPoster,
        trailer: req.body.newTrailer,
      },
    }
  );

  const editedMovie = await dbMovie.findById(req.params.id);

  //Local update
  toEdit.title = editedMovie.title;
  toEdit.director = editedMovie.director;
  toEdit.genres = editedMovie.genres;
  toEdit.actors = editedMovie.actors;
  toEdit.runtime = editedMovie.runtime;
  toEdit.release = editedMovie.release;
  toEdit.summary = editedMovie.summary;
  toEdit.ageRating = editedMovie.ageRating;
  toEdit.price = editedMovie.price;
  toEdit.poster = editedMovie.poster;
  toEdit.trailer = editedMovie.trailer;

  res.redirect("/movieslist/" + req.params.id);
  console.log("Edited: " + req.params.id);
};
