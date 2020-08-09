var express = require('express');
var bcrypt = require('bcryptjs');
var User = require('../models/user');
var router = express.Router();
var passport = require('passport')
var { body, validationResult } = require('express-validator');

/* login*/
// Login Processing
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect:'/home',
    failureRedirect:'/',
    failureFlash: true
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
   /// return res.status(400).json({ errors: errors.array() });
    res.render('home', { errors: errors.array()  });


  }else{

    var newUser = new User({
 
      username: req.body.username,
      phone: req.body.phone,
      password: req.body.password

    });

    User.registerUser(newUser, (err, user) => {
      if(err) throw err;
      req.flash('success_msg', 'You are registered and can log in');
      res.redirect('/');
    });

  }

  
});

module.exports = router;                                                      