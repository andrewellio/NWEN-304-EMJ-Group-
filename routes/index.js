var express = require("express");
var router = express.Router();
var controller = require("../controllers/moviesController.js");

/* GET index page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

/* GET home page. */
router.get("/home", function (req, res, next) {
  res.render("home", { title: "Express" });
});

/* GET movies page. */
router.get("/movieslist", controller.getMoviesPage);

/* GET movie page. */
router.get("/movie", function (req, res, next) {
  res.render("movie", { title: "Express"});
});

/* GET dynamic movie page. */
router.get("/movieslist/:id", controller.getDynamicMovieDetails);

/* GET movie page. */
router.get("/movie-test", function (req, res, next) {
  res.render("movie-test", { title: "Express" });
});

/* GET search page. */
router.get("/search", function (req, res, next) {
  res.render("search", { title: "Express" });
});

/* GET cart page. */
router.get("/shoppingcart", function (req, res, next) {
  res.render("shoppingcart", { title: "Express" });
});

/* GET account page. */
router.get("/myaccount", function (req, res, next) {
  res.render("myaccount", { title: "Express" });
});

/* GET login page. */
router.get("/login", function (req, res, next) {
  res.render("login", { title: "Express" });
});

/* GET register page. */
router.get("/register", function (req, res, next) {
  res.render("register", { title: "Express" });
});

//Db Connection Start
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect("mongodb+srv://webapp:m4rs4f031998@moviedatabase.pwl6x.azure.mongodb.net/MovieDB?retryWrites=true&w=majority", {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {console.log("mongoSB connection success - active")
  // we're connected!
  
});

const userSchema = new mongoose.Schema({
    name :String,
    email :String,
    usr :String,
    psw :String
});

const User = mongoose.model('User', userSchema);

router.post("/register", function (req, res, next){
  const data = new User ({
    name: req.body.name,
    email: req.body.email,
    usr: req.body.usr,
    psw: req.body.psw
  });
  data.save();
  //console.log(req.body);
});



/* GET admin page. */
router.get("/admin", function (req, res, next) {
  res.render("admin", { title: "Express" });
});

module.exports = router;
