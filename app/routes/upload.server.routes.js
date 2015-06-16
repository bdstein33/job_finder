module.exports = function(app) {
  var upload = require('../controllers/upload.server.controller');

    app.route('/upload')
    .post(upload.acceptData)
};