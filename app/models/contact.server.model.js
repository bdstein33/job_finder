var mongoose = require('mongoose');

var ContactSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    match: [/.+\@.+\..+/, "Please enter a valid e-mail address"]
  },
  company: String,
  companyUrl: String,
  title: String
  //ADD EXPERIENCES
});

mongoose.model('Contact', ContactSchema);