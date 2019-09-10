var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'luvaihassanalit@gmail.com',
    pass: 'StrongPassword22'
  }
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/help', function(req, res, next) {
  res.render('help');
});

router.get('/policy', function(req, res, next) {
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
