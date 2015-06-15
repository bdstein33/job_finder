var mongoose = require('mongoose');

var ContactSchema = new Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    match: [/.+\@.+\..+/, "Please enter a valid e-mail address"]
  },
  company: String,
  companyUrl: String,
  title: String
  //ADD EXPERIENCES
});