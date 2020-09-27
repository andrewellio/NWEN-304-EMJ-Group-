const movies = [];

module.exports = class Movie{
  constructor(id, title, director, genres, actors, runtime, release, summary, ageRating, price) {
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
    }
}

add() {
  movies.add(this);
}

