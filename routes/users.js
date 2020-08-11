var express = require('express');
var router = express.Router();
var User = require('../models/user');


/* GET users listing. */
router.get('/users', function(req, res, next) {
  res.send('respond with a resource');
});

router.put('/users/:id', (req, res, next) => {
  var user = new User({
    _id: req.params.id,
    phone: req.body.phone,
    password: req.body.password,
  
  });
  User.updateOne({_id: req.params.id}, user).then(
    () => {
      req.flash("info", "User updated");
      res.redirect('home');
    }
  ).catch(
    (error) => {
      req.flash("error", "Updated failed");
      res.redirect('home');
    }
  );
});


router.delete('/users/:id', (req, res, next) => {
  User.deleteOne({_id: req.params.id}).then(
    () => {
      req.flash("info", "User deleted");
      res.redirect('index');
    }
  ).catch(
    (error) => {
      req.flash("error", "Delete failed");
      res.redirect('home');
    }
  );
});


module.exports = router;
