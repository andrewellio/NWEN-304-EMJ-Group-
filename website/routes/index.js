var express = require("express");
var router = express.Router();
var controller = require("../controllers/moviesController.js");
var mongoose = require("mongoose");
const User = require("../dbmodels/User");
const passport = require("passport");
const Movie = require("../models/movie");
const dbMovie = require("../dbmodels/Movie");





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
router.post("/shoppingcart/:id", controller.removeMovie);

/* GET search page. */
router.get("/search", controller.getSearchPage);

/* GET cart page. */
router.get("/shoppingcart", controller.getShoppingCartPage, function (req, res, next) {
  res.render("shoppingcart", { title: "Express" });
});

/* GET account page. */
router.get("/myaccount",isLoggedIn,  function (req, res, next) {
  console.log(req.user);
 
  pastPurchases = [];
  

   for(var i =0; i<req.user.pastPurchases.length; i++){
     var id = req.user.pastPurchases[i];
     pastPurchases[i] = Movie.search(id);

   }
 
  res.render("myaccount", { name: req.user.name, email: req.user.email, movies: pastPurchases});

});



/* GET login page. */
router.get("/login", function (req, res, next) {
  res.render("login", { title: "Express" });
});

/* POST login page */
router.post("/login", passport.authenticate("local",{
  successRedirect:"/myaccount",
  failureRedirect:"/login"
}));

/* GET register page. */
router.get("/register", function (req, res, next) {
  res.render("register", { title: "Express" });
});

/* POST register page */
router.post("/register", function (req, res, next) {
  User.register(new User({name: req.body.name , email: req.body.email, username: req.body.usr, admin: false, shoppingCart: [], pastPurchases: []}), req.body.psw, function(err, user) {
    if (err) {
      console.log(err);
      return res.render('register', { user : user });
    }
    
    
    passport.authenticate('local')(req, res, function () {
      res.redirect('/myaccount');
    });
  });
});

/* GET upload (admin) page. */
router.get("/upload", function (req, res, next) {
  res.render("upload", { title: "Express" });
});

/* POST movie from upload page. */
router.post("/upload", controller.addMovie);

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
 
  res.render("/login");
}

/* GET facebook page. */
router.get("/facebook", function (req, res, next) {
  res.render("facebook", { title: "Express" });
});

router.get("/facebookLog", function (req, res, next) {
  res.render("myaccount", { name: 'Facebook User', email: 'User Email'})
});

router.get('/auth/facebook', passport.authenticate((['local', 'facebook']), {
  scope: ['public_profile', 'email']
}));

router.get('/auth/facebook/callback',
  passport.authenticate((['local', 'facebook']), {
    successRedirect: '/facebookLog',
    failureRedirect: '/error'
  }));

router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;
