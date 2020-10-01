const movies = [];

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

  add() {
    movies.push(this);
  }

  static search(id) {
    var foundMovie = null;
    movies.forEach(function (movie) {
      if (movie.id == id) {
        foundMovie = movie;
      }
    });
    return foundMovie;
  }

  static all() {
    return movies;
  }

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
};
