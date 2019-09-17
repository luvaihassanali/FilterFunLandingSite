var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var visitorshome = 0;
var visitorshelp = 0;
var visitorspolicy = 0;

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'luvaihassanalit@gmail.com',
    pass: 'StrongPassword22'
  }
});

/* GET home page. */
router.get('/', function(req, res, next) {
  visitorshome++;
  console.log("\n----- visitors home: " + visitorshome + " -----\n");
  res.render('index');
});

router.get('/help', function(req, res, next) {
  visitorshelp++;
  console.log("\n----- visitors help: " + visitorshelp + " -----\n");
  res.render('help');
});

router.get('/policy', function(req, res, next) {
  visitorspolicy++;
  console.log("\n----- visitors policy: " + visitorspolicy + " -----\n");
  res.render('policy');
});

router.post('/messageForm',function(req, res, next){
  var email=req.body.e;
  var subject= req.body.s;
  var body = req.body.m
 
  var mailOptions = {
    from: email,
    to: 'luvaihassanali@gmail.com',
    subject: email+"#"+subject,
    text: body
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      res.end('Email failed to send, try again later.')
      console.log("An email failed to send:" + error)
    } else {
      res.end('Email sent successfully.'); //: ' + info.response);
    }
  });
});
module.exports = router;
