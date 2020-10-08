var express = require("express");
var router = express.Router();
var controller = require("../controllers/moviesController.js");
var mongoose = require("mongoose");
const User = require("../dbmodels/User");


/* GET index page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

/* GET home page. */
router.get("/home", controller.getHomePage, function (req, res, next) {
  res.render("home", { title: "Express" });
});

/* GET movies page. */
router.get("/movieslist", controller.getMoviesPage);

/* GET movie page. */
router.get("/movie", function (req, res, next) {
  res.render("movie", { title: "Express" });
});

/* GET dynamic movie page. */
router.get("/movieslist/:id", controller.getDynamicMovieDetails);

/* PATCH movie */
router.post("/movieslist/:id", controller.editMovie);

/* Delete movie*/
router.post("/movieslist/delete/:id", controller.removeMovie);

/* GET movie page. */
router.get("/movie-test", function (req, res, next) {
  res.render("movie-test", { title: "Express" });
});

/* GET search page. */
router.get("/search", controller.getSearchPage);

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

var matchusr=false;
var matchpsw=false;

/* POST register page*/
router.post("/login", function (req, res, next) {
  const data = new User({
    usr: req.body.usr,
    psw: req.body.psw, 
  });

  User.findOne({ 'usr': req.body.usr}, 'usr', function (err, user) {
    if(user.usr == req.body.usr){
      matchusr=true;
    }
    if(err){
      console.log("An error has occured while logging in")
    }

  });

    User.findOne({ 'psw': req.body.psw}, 'psw', function (err, user) {
      if(user.psw == req.body.psw){
        matchpsw=true;
      }
      if(err){
        console.log("An error has occured while logging in")
      }
    
    });

      if(matchusr && matchpsw){
        console.log("Login successfill, welcome " + req.body.usr)
      }
      else{
        console.log("Login was unsuccessful")
      }
      res.render("movies", { title: "Express" });
    });

  
    //if user.usr equals req.body.usr and user.psw equals req.body.psw then create session cookie, update navbar, hello! <username> and 
    //change routes to use users.js

/* GET register page. */
router.get("/register", function (req, res, next) {
  res.render("register", { title: "Express" });
});

/* POST register page*/
router.post("/register", function (req, res, next) {
  const data = new User({
    name: req.body.name,
    email: req.body.email,
    usr: req.body.usr,
    psw: req.body.psw,
  });
  data.save();
  res.render("login", { title: "Express" });
});

/* GET upload (admin) page. */
router.get("/upload", function (req, res, next) {
  res.render("upload", { title: "Express" });
});

/* POST movie from upload page. */
router.post("/upload", controller.addMovie);

module.exports = router;
