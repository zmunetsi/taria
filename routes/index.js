var express = require('express');
var router = express.Router();
var passport = require('passport');
const { authenticate } = require('passport');

var isLoggedIn = false;

/* GET landing page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'landing' });
});

/* GET home page. */
// router.get('/home', 
//   passport.authenticate('local', { failureRedirect: '/' }),
//   function(req, res) {
//     res.redirect('/home');
//   });

  router.get('/home', ensureAuthenticated, (req, res, next) => {

    if(req.isAuthenticated()){
      res.render('home', {isAuthenticated: true});

    }else{

      res.render('home', {isAuthenticated: false});
    }
   
  });


/* login */
router.post('/login',require('./auth'));
/* register*/
router.post('/register',require('./auth'));
// Logout
router.get('/logout', (req, res, next) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/');
});



// Access Control
function ensureAuthenticated(req, res, next){
  if(req.isAuthenticated()){
    return next();
  } else {
    req.flash('error_msg', 'You are not authorized to view that page');
    res.redirect('/');
  }
}



module.exports = router;
