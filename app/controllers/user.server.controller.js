var User = require('mongoose').model('User');
var passport = require('passport');

// var fs = require('fs');
// var parse = require('csv-parse');
// var request = require('request');
// var cheerio = require('cheerio');

exports.signup = function(req, res, next) {
  // If user isn't logged in, create a new user object

  User.findOne({email: req.body.email}).exec( function(err, user) {
    if (err) return res.send({success: false, message: 'Internal error'});

    if (user) {
      return res.send({success: false, message: 'User already exists'});
    }

    var newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password
    });

    newUser.save(function(err) {
      if (err) return res.send({success: false, message: 'Internal error'});

      return res.send({success: true, message: 'Authentication succeeded', user: newUser});
    })
  });
  // if (!req.user) {
  //   var user = new User({
  //     firstName: req.body.firstName,
  //     lastName: req.body.lastName,
  //     email: req.body.email,
  //     password: req.body.password
  //   });
  //   // Attempt to save new user object
  //   user.save(function(err) {
  //     if (err) {
  //       console.log("FAILED TO SIGN UP");
  //       return res.send({success: false, message: 'Internal Error'});
  //     }
  //   });
  // } 
  // else {
  //   return res.send({success: true, message: 'Account creation successful', user: user});
  // }
};

exports.signout = function(req, res) {
  req.logout();
  res.redirect('/');
}