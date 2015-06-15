var mongoose = require('mongoose');
var Contact = require('mongoose').model('Contact');


var UserSchema = new Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+\@.+\..+/, "Please enter a valid e-mail address"]

  },
  contacts: [Contact],
  password: {
    type: String,
    required: true,
    validate: [
      function(password) {
        return password.length >= 7;
      },
      'Password must be at least 7 characters'
    ]
  },
  salt: {type: String},
  
  

});