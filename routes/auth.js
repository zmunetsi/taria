var express = require('express');
var bcrypt = require('bcryptjs');
var User = require('../models/user');
var router = express.Router();
var passport = require('passport')
var { body, validationResult } = require('express-validator');

/* login*/
router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) { 
      req.flash("error", "Login failed, please try again.");
      return res.redirect('/'); }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.redirect('/home' + '?id=' + user.id+ '&username=' +user.username);
    });
  })(req, res, next);
});


/* register */
router.post('/register', [

  body('username').notEmpty()
                  .withMessage('Username is required'),
  body('phone').notEmpty()
                  .withMessage('Phone is required'),
  body('password').isLength({ min: 5 })
                  .withMessage('Password should be greater than 5 characters'),
  body('password_confirm').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Password confirmation does not match password');
    }

  return true;
}).withMessage('Password confirmation does not match password'),
    
], (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.render('home', { errors: errors.array()  });


  }else{

    var newUser = new User({
 
      username: req.body.username,
      phone: req.body.phone,
      password: req.body.password

    });

    User.registerUser(newUser, (err, user) => {
      if(err) throw err;
      req.flash("info", "You are successfully registered, Plese log in.");
      res.redirect('/');
    });

  }

  
});

module.exports = router;                                                      