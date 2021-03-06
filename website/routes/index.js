var express = require("express");
var router = express.Router();
var controller = require("../controllers/moviesController.js");
var mongoose = require("mongoose");
const User = require("../dbmodels/User");
const passport = require("passport");
const Movie = require("../models/movie");
const dbMovie = require("../dbmodels/Movie");





/* GET index page. */
router.get("/", controller.getIndexPage, function (req, res, next) {
  res.render("/", { title: "Express" });
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

/* GET search page. */
router.get("/search", controller.getSearchPage);

/* GET cart page. */
router.get("/shoppingcart", controller.getShoppingCartPage, function (req, res, next) {
  res.render("shoppingcart", { title: "Express" });
});

/* GET account page. */
router.get("/myaccount", isLoggedIn, function (req, res, next) {
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

router.get("/facebookLog",isLoggedIn,function(req, res, next) {
  pastPurchases = [];
 
    res.render("myaccount", { name: 'Facebook User - Purchases Not Available when using Facebook Login', email: "Facebook User Email", movies: pastPurchases});
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

//Shopping Cart Routes - from movie page
router.post("/shoppingCart/add/:id", async function (req, res, next) {
  if(req.isAuthenticated()) {
    const id = await req.user._id;

    const updateduser = await User.updateOne(
      { _id: id },
      
      {
        $push: {
          shoppingCart: [req.params.id]
        },
      }
    );

    
    res.redirect("/movieslist/" + req.params.id);
    
   
  } else {
    res.status(400).redirect("/movieslist/" + req.params.id);
  }
});

router.post("/shoppingCart/delete/:id", async function (req, res, next) {
  
  if(req.isAuthenticated()) {
    const id = await req.user._id;
  

    const updateduser = await User.updateOne(
      { _id: id },
      {
        $pull: {
          shoppingCart: req.params.id
        },
      }
    );
    
    
    res.redirect("/movieslist/" + req.params.id);
  } else {
    res.status(400).redirect("/movieslist/" + req.params.id);
  }
});


//Shopping Cart Routes - from shopping cart page

router.post("/shoppingCart/deleteCartPage/:id", async function (req, res, next) {
  
  if(req.isAuthenticated()) {
    const id = await req.user._id;
  

    const updateduser = await User.updateOne(
      { _id: id },
      {
        $pull: {
          shoppingCart: req.params.id
        },
      }
    );
    
    res.redirect("/shoppingCart");
  } else {
    res.status(400).redirect("/movieslist/" + req.params.id);
  }
});

//Past Purchases Routes
router.post("/pastPurchases/add/:id", async function (req, res, next) {
  if(req.isAuthenticated()) {
    const id = await req.user._id;

    const updateduser = await User.updateOne(
      { _id: id },
      {
        $push: {
          pastPurchases: [req.params.id]
        },
        $pull: {
          shoppingCart: req.params.id
        },
      }
    );
    
    res.redirect("/movieslist/" + req.params.id);
  } else {
    res.status(400).redirect("/movieslist/" + req.params.id);
  }
});

router.post("/pastPurchases/delete/:id", async function (req, res, next) {
  if(req.isAuthenticated()) {
    const id = await req.user._id;

    const updateduser = await User.updateOne(
      { _id: id },
      {
        $pull: {
          pastPurchases: [req.params.id]
        },
      }
    );
    
    res.redirect("/movieslist/" + req.params.id);
  } else {
    res.status(400).redirect("/movieslist/" + req.params.id);
  }
});

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});


function checkLoggedIn(req){
  if(req.isAuthenticated()){
    return true;

  }

  else{
    return false;
  }
}


module.exports = router;
