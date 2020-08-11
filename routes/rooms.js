var express = require('express');
var router = express.Router();
var { v4: uuidv4 } = require('uuid');
var User = require('../models/user');


router.get('/rooms', (req, res, next) => {

  var username = req.query.username;
  var roomcapacity = req.query.roomcapacity;
  var roomname = req.query.roomname;
  var host = req.query.host;
  var userid = req.query.userid;
  var roomid;

  if(host === "true" ){
   
    roomid = uuidv4();

  }else{

    roomid = req.query.roomid;   

  }
 
  if(req.isAuthenticated()){
    
    res.render('room', {isAuthenticated: true, userName: username, userId: userid, roomid : roomid, roomcapacity: roomcapacity, roomname: roomname, host: host});

  }
  else{
    
    res.render('index', {isAuthenticated: false,userName: username,userId: userid, roomid : roomid, roomcapacity: roomcapacity, roomname: roomname, host: host});

  }


  });

  module.exports = router;
  