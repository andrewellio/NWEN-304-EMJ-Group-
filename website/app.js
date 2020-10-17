var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");

var passport = require("passport");
var bodyParser = require("body-parser");
var User = require("./dbmodels/User"); 
var LocalStrategy = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(require("express-session")({
  secret:"randomlygeneratedsecretkey",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

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
