var config = require('./config');
var mongoose = require('mongoose');

//required by server.js
module.exports = function() {
  // Assigns database source depending on environment
  var db = mongoose.connect(config.db);

  // Models
  require('../app/models/user.server.model');
  require('../app/models/contact.server.model');

  return db;
};