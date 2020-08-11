var express = require('express');
var router = express.Router();
var app    = express();
var passport = require('passport');
var { authenticate } = require('passport');

var isLoggedIn = false;

router.use( require('./users'));
router.use( require('./rooms'));

router.get('/', function(req, res, next) {

  if(req.isAuthenticated()){
    res.render('index', {isAuthenticated: true});

  }else{

    res.render('index', {isAuthenticated: false});
  }

});


  router.get('/home', ensureAuthenticated, (req, res, next) => {

    if(req.isAuthenticated()){

      try {

        var userId = req.query.id;
        var userName = req.query.username;
        
      } catch (error) {
        console.log(error);
      }
      
      res.render('home', {isAuthenticated: true, userId : userId, userName: userName});

    }else{

      res.render('home', {isAuthenticated: false});
    }
   
  });

router.post('/login',require('./auth'));
router.post('/register',require('./auth'));
router.get('/logout', (req, res, next) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/');
});


function ensureAuthenticated(req, res, next){
  if(req.isAuthenticated()){
    return next();
  } else {
    req.flash('error_msg', 'You are not authorized to view that page');
    res.redirect('/');
  }
}

module.exports = router;
