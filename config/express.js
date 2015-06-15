var config = require('./config.js');
var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');



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
  app.use(bodyParser.json());

  app.use(session({
    saveUninitialized: true, // Forces an uninitialized (new but not modified) session to be saved to the store
    resave: false, // Forces the session to be saved back to the session store
    secret: config.sessionSecret // The secret used to sign the session ID cookie

  }));






};