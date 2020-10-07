const dbMovie = require("../dbmodels/Movie");

var movies = [];

module.exports = class Movie {
  constructor(
    id,
    title,
    director,
    genres,
    actors,
    runtime,
    release,
    summary,
    ageRating,
    price,
    poster,
    trailer
  ) {
    this.id = id;
    this.title = title;
    this.director = director;
    this.genres = genres;
    this.actors = actors;
    this.runtime = runtime;
    this.release = release;
    this.summary = summary;
    this.ageRating = ageRating;
    this.price = price;
    this.poster = poster;
    this.trailer = trailer;
  }

  //Gets movies from db and stores details locally
  static async loadDB() {
    try {
      console.log("Loading DB...");
      const dbmovies = await dbMovie.find();
      dbmovies.forEach(function (movie) {
        var newMovie = new Movie(
          movie._id,
          movie.title,
          movie.director,
          movie.genres,
          movie.actors,
          movie.runtime,
          movie.release,
          movie.summary,
          movie.ageRating,
          movie.price,
          movie.poster,
          movie.trailer
        );
        newMovie.add();
        console.log("Added: " + newMovie.title);
      });
      console.log("Finished loading DB");
    } catch(err) {
      console.log(err);
    }
  }

  //Adds movie to list of movies locally
  add() {
    movies.push(this);
  }

  //Searchs for a movie locally by id
  static search(id) {
    var foundMovie = null;
    movies.forEach(function (movie) {
      if (movie.id == id) {
        foundMovie = movie;
      }
    });
    return foundMovie;
  }

  //Gets all movies in local list
  static all() {
    return movies;
  }

  //Gets all movies in local list, sorted alphabetically
  static allByTitle() {
    return movies.sort(function (a, b) {
      if (a.title < b.title) {
        return -1;
      }
      if (a.title > b.title) {
        return 1;
      }
      return 0;
    });
  }

  order() {
    movies.sort();
  }

  static delete(id) {
    const toDelete = this.search(id);
    var i = 0;
		while(i < movies.length) {
			if(movies[i] == toDelete){
				movies.splice(i, 1);
			} else {
				i = i + 1;
			}
		}
  }
};


