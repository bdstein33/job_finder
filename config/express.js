var config = require('./config.js');
var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var session = require('express-session');
var exphbs = require('express-handlebars');
var passport = require('passport');



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
  app.use(bodyParser.json({limit: '50mb'}));
  app.use(session({
    saveUninitialized: true, // Forces an uninitialized (new but not modified) session to be saved to the store
    resave: false, // Forces the session to be saved back to the session store
    secret: config.sessionSecret // The secret used to sign the session ID cookie

  }));

  // Assign handblebar to app
  partialsDir = "views/partials/";
  app.engine('.hbs', exphbs({layout: 'main', extname: '/hbs'})); 
  // Tell app where to look for handelbar view templates 
  app.set('views', './app/views');
  app.set('partialsDir', '/.app/views/partials');
  // Tell express to use hbs template engine
  app.set('view engine', '.hbs');

  // Tell express to use public folder for static files
  app.use(express.static('public')); 

  app.use(passport.initialize());
  app.use(passport.session());

  // app.use(express.bodyParser({limit: '50mb'}));



  require('../app/routes/index.server.routes')(app);
  require('../app/routes/user.server.routes')(app);
  require('../app/routes/upload.server.routes')(app);

  return app;
};