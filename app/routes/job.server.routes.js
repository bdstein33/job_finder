module.exports = function(app) {
  var job = require('../controllers/job.server.controller');

  app.param('company', job.getCompanyName);
  app.get('/jobs/:company', job.findJobs);
};
