var express = require('express');
var router = express.Router();
var { v4: uuidv4 } = require('uuid');
var User = require('../models/user');


router.get('/rooms', (req, res, next) => {

  var username = req.query.username;
  var roomcapacity = req.query.roomcapacity;
  var roomname = req.query.roomname;
  var host = req.query.host;
  var roomid;

  console.log(host);

  if(host){
   
    roomid = uuidv4();

  }else{

    roomid = req.query.roomid;   

  }

    res.render('room', {username: username, roomid : roomid, roomcapacity: roomcapacity, roomname: roomname, host: host});

  });

  module.exports = router;
  