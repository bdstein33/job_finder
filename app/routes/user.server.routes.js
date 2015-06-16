var user = require('../controllers/user.server.controller');
var passport = require('passport');

module.exports = function(app) {

 app.post('/signin', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.send({success: false, message: 'Authentication failed'});
    }

    return res.send({success: true, message: 'Authentication succeeded', user: user._id});
  })(req, res, next);
 });


  app.route('/signup')
    .post(user.signup);

  app.get('/signout', user.signout);
};