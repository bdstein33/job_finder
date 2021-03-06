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
    
    return res.send({success: true, message: 'Authentication succeeded', user: user});
  })(req, res, next);
 });


  app.route('/signup')
    .post(user.signup);


  app.param('userid', user.getContacts);
  app.get('/contacts/:userid', user.sendContacts);



  // app.get('/signout', user.signout);
};