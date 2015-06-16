var mongoose = require('mongoose');

var ContactSchema = new mongoose.Schema({
  name: String,
  // email: {
  //   type: String,
  //   match: [/.+\@.+\..+/, "Please enter a valid e-mail address"]
  // },
  experiences: Array
});

mongoose.model('Contact', ContactSchema);