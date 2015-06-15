var fs = require('fs');
var parse = require('csv-parse');
var request = require('request');
var cheerio = require('cheerio');


exports.render = function(req, res) {
  console.log("TEST");
  res.render('index',  {
    title: "Please work!"
  });
};