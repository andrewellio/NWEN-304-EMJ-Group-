var express = require('express');
var router = express.Router();

/* GET index page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET home page. */
router.get('/HomePage', function(req, res, next) {
  res.render('HomePage', { title: 'Express' });
});

/* GET movies page. */
router.get('/MoviesList', function(req, res, next) {
  res.render('MoviesList', { title: 'Express' });
});

/* GET search page. */
router.get('/Search', function(req, res, next) {
  res.render('Search', { title: 'Express' });
});

/* GET cart page. */
router.get('/ShoppingCart', function(req, res, next) {
  res.render('ShoppingCart', { title: 'Express' });
});

/* GET account page. */
router.get('/MyAccount', function(req, res, next) {
  res.render('MyAccount', { title: 'Express' });
});

/* GET login page. */
router.get('/Login', function(req, res, next) {
  res.render('Login', { title: 'Express' });
});

/* GET register page. */
router.get('/Register', function(req, res, next) {
  res.render('Register', { title: 'Express' });
});

/* GET admin page. */
router.get('/Admin', function(req, res, next) {
  res.render('Admin', { title: 'Express' });
});

module.exports = router;
