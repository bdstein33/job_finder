var fs = require('fs');
var parse = require('csv-parse');
var request = require('request');
var cheerio = require('cheerio');


exports.signinRender = function(req, res) {
  res.render('signin',  {
    
  });
};

exports.signupRender = function(req, res) {
  res.render('signup', {

  });
};

exports.signin = function(req, res) {
 
  username = req.body.username;
  password = req.body.password;

  
  return res.redirect('/');
};


exports.signup = function(req, res) {
  // If user isn't logged in, create a new user object
  if (!req.user) {
    var user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password
    });
    // Attempt to save new user object
    user.save(function(err) {
      if (err) {
        console.log("FAILED TO SIGN UP");
        return res.redirect('/signup');
      }
      req.login(user, function(err) {
        if (err) {
          return next(err);
        }
        return res.redirect('/')
      });
    });
  } else {
    return res.redirect('/');
  }





  username = req.body.username;
  password = req.body.password;
  
  return res.redirect('/');
};