var express = require('express');
var router = express.Router();

/* GET index page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET home page. */
router.get('/home', function(req, res, next) {
  res.render('home', { title: 'Express' });
});

/* GET movies page. */
router.get('/movieslist', function(req, res, next) {
  res.render('movieslist', { title: 'Express' });
});

/* GET search page. */
router.get('/search', function(req, res, next) {
  res.render('search', { title: 'Express' });
});

/* GET cart page. */
router.get('/shoppingcart', function(req, res, next) {
  res.render('shoppingcart', { title: 'Express' });
});

/* GET account page. */
router.get('/myaccount', function(req, res, next) {
  res.render('myaccount', { title: 'Express' });
});

/* GET login page. */
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Express' });
});

/* GET register page. */
router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Express' });
});

/* GET admin page. */
router.get('/admin', function(req, res, next) {
  res.render('admin', { title: 'Express' });
});

module.exports = router;
