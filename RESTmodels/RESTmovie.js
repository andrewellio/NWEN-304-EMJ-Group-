const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
  id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  director: {
    type: [String],
    required: true,
  },
  genres: {
    type: [String],
    required: true,
  },
  actors: {
    type: [String],
    required: true,
  },
  runtime: {
    type: Number,
    required: true,
  },
  release: {
    type: Number,
    required: true,
  },
  summary: {
    type: String,
    required: true,
  },
  ageRating: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  poster: {
    type: String,
    required: true,
  },
  trailer: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("RESTmovie", MovieSchema);
