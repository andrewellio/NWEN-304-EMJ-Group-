const movieOperations = {
  movies = [],

  add(movie) {
    this.movies.push(movie);
  },

  removeById(id) {
    for(i = 0; i < movies.length; i++) {
      if(movie.id == movies[i]) {
        this.movies.splice(i, 1);
      }
    }
  },

  searchById(id) {
    for(i = 0; i < movies.length; i++) {
        if(movie.id == movies[i]) {
          return movie;
        }
      }
  },
}
