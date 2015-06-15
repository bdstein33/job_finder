module.exports = function(app) {
  var user = require('../controllers/user.server.controller');

  app.route('/signin')
    .get(user.signinRender)
    .post(user.signin);

  app.route('/signup')
    .get(user.signupRender)
    .post(user.signup);
};