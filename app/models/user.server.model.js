var mongoose = require('mongoose');
var Contact = require('mongoose').model('Contact');
var crypto = require('crypto');
var Schema = mongoose.Schema;


var ContactSchema = new mongoose.Schema({
  name: String,
  industry: String,
  // email: {
  //   type: String,
  //   match: [/.+\@.+\..+/, "Please enter a valid e-mail address"]
  // },
  experiences: Array
});

var UserSchema = new Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+\@.+\..+/, "Please enter a valid e-mail address"]

  },
  contacts: [ContactSchema],
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
  salt: {type: String}
});

// Return User's first and last name
UserSchema.virtual('fullName').get(function() {
  return this.firstName + ' ' + this.lastName;
});

// Hash user password before saving
UserSchema.pre('save', function(next) {
  if (this.password) {
    // Create an autogenerated pseudo-random hashing salt
    this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');

    this.password = this.hashPassword(this.password);
  }
  next();
});

// Return hashed version of password
UserSchema.methods.hashPassword = function(password) {
  return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
};

// Check if user exists with given email address
UserSchema.methods.authenticate = function(password) {
  console.log(this.password);
  console.log(this.hashPassword(password));
  return this.password === this.hashPassword(password);
};

UserSchema.set('toJSON', {
  getters: true,
  virtuals: true
});


mongoose.model('User', UserSchema);