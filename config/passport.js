var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function() {
  var User = mongoose.model('User');

  // Determines what data from the user object should be stored in the session result of serializeUser method is attached to the session as req.session.passport.user
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  // Pass in key that is saved in req.session.passport.user -- this key is used to retrieve the user object attaches the user object to the request as req.user
  passport.deserializeUser(function(id, done) {
    User.findOne({
      _id: id
    }, function(err, user) {
      done(err, user);
    });
  });


  passport.use(new LocalStrategy({
    // by default, local strategy uses username and password, we will override with email
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true // allows us to pass back the entire request to the callback
  },
  function(req, email, password, done) {
    User.findOne({ 'email' : email}, function(err, user) {
      console.log(user);
      if (err) return done(err);
      if (!user) return done(null, false);
      if (!user.authenticate(password)) return done(null, false);
      return done(null, user);
    });
  }));
};