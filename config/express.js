var config = require('./config.js');
var express = require('express');
var bodyParser = require('body-parser');



module.exports = function() {
  var app = express();

  // Log request details to console if in development mode
  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  }

  // Converts req.body content into JSON
  app.use(bodyParser.urlencoded({
    extended: true
  }));
};