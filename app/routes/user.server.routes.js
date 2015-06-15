var user = require('../controllers/user.server.controller');
var passport = require('passport');

module.exports = function(app) {

  app.route('/signin')
    .get(user.signinRender)
    .post(passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/signin',
      failureFlash: true
    }));

  app.route('/signup')
    .get(user.signupRender)
    .post(user.signup);

  app.get('/signout', user.signout);
};