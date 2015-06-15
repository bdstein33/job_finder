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
 
  username = req.body.username;
  password = req.body.password;

  
  return res.redirect('/');
};