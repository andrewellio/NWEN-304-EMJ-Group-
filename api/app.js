const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/routes.js')
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use('/api/movies', router);

mongoose.set('useUnifiedTopology', true);
mongoose.connect(
  "mongodb+srv://webapp:m4rs4f031998@moviedatabase.pwl6x.azure.mongodb.net/MovieDB?retryWrites=true&w=majority",
  { useNewUrlParser: true },
  () => console.log('connected to DB')
);

app.listen(3000);

//James testdb: 'mongodb+srv://emj:gQsGMWdKdW5iZisa@emj-movie-db.lusgk.gcp.mongodb.net/movies?retryWrites=true&w=majority'
//Maindb (Elliots): "mongodb+srv://webapp:m4rs4f031998@moviedatabase.pwl6x.azure.mongodb.net/MovieDB?retryWrites=true&w=majority"