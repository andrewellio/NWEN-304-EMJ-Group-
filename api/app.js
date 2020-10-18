const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/routes.js')
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const app = express();
const passport = require("passport");
const LocalStrategy = require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");
const User = require ('./models/User.js');


app.use(bodyParser.json());

app.use(passport.initialize());
passport.use(new LocalStrategy({usernameField:"usr", passwordField:"psw"}, User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/api', router);

mongoose.set('useUnifiedTopology', true);
mongoose.connect(
  "mongodb+srv://webapp:m4rs4f031998@moviedatabase.pwl6x.azure.mongodb.net/MovieDB?retryWrites=true&w=majority",
  { useNewUrlParser: true },
  () => console.log('connected to DB')
);

app.listen(3000);

//James testdb: 'mongodb+srv://emj:gQsGMWdKdW5iZisa@emj-movie-db.lusgk.gcp.mongodb.net/movies?retryWrites=true&w=majority'
//Maindb (Elliots): "mongodb+srv://webapp:m4rs4f031998@moviedatabase.pwl6x.azure.mongodb.net/MovieDB?retryWrites=true&w=majority"