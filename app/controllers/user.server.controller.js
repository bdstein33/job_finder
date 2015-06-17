var User = require('mongoose').model('User');
var passport = require('passport');

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
    });
  });
};

exports.getContacts = function(req, res, next, userid) {
  User.findOne({ '_id' : userid}, function(err, user) {
    if (user) {
      req.user = user;
      next();
    } else {
      next(new Error('Invalid user id'));
    }
  });
};

exports.sendContacts = function(req, res, next) {
  var user = req.user;
  // contacts = user.contacts;
  res.json(user.contacts);
}

// exports.signout = function(req, res) {
//   req.logout();
//   res.redirect('/');
// }