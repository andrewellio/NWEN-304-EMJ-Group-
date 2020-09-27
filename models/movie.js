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

  add() {
    movies.push(this);
  }

  static search(id) {
    var foundMovie = null;
    movies.forEach(function(movie){
			if(movie.id == id){
				foundMovie = movie;
			}
		})
		return foundMovie;
  }
}



