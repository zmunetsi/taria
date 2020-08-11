var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.get('/rooms', (req, res, next) => {

  var username = req.query.username;
  var roomid = req.query.roomid;
  var roomcapacity = req.query.roomcapacity;
  var roomname = req.query.roomname;
  var host = req.query.host;


    res.render('room', {username: username, roomid : roomid, roomcapacity: roomcapacity, roomname: roomname, host: host});

  });

  module.exports = router;
  