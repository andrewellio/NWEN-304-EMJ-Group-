var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");
const session = require('express-session');

var passport = require("passport");
var bodyParser = require("body-parser");
var User = require("./dbmodels/User"); 
var LocalStrategy = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");


const config = require('./routes/config')

//FACEBOOK OAUTH
const FacebookStrategy = require('passport-facebook').Strategy;

var app = express();



app.use(passport.initialize());
app.use(passport.session());

app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'SECRET'
}));


passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

passport.use(new FacebookStrategy({
    clientID: config.facebookAuth.clientID,
    clientSecret: config.facebookAuth.clientSecret,
    callbackURL: config.facebookAuth.callbackURL
  }, function (accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
));




app.use(bodyParser.urlencoded({extended:true}));
app.use(require("express-session")({
  secret:"randomlygeneratedsecretkey",
  resave: false,
  saveUninitialized: false
}));

passport.use(new LocalStrategy({usernameField:"usr", passwordField:"psw"}, User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

//Db Connection Start
mongoose.Promise = global.Promise;
mongoose.set('useUnifiedTopology', true);
mongoose.connect(
  "mongodb+srv://webapp:m4rs4f031998@moviedatabase.pwl6x.azure.mongodb.net/MovieDB?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("mongoDB connection success - active");
  // we're connected!
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
