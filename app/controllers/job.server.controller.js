var http = require('http');
var request = require('request');
var parseString = require('xml2js').parseString;
var Promise = require("bluebird");


exports.getCompanyName = function(req, res, next, company) {
  req.company = company;
  next();
};

exports.findJobs = function(req, res, next) {
  var company = req.company;
  var queryString = "company:" + company;
  var data;
  request("http://api.indeed.com/ads/apisearch?publisher=7517861088550134&q=" + queryString + "&l=ca&sort=&radius=&st=&jt=fulltime&start=&limit=100&fromage=&filter=1&latlong=0&co=us&chnl=&userip=1.2.3.4&useragent=Mozilla/%2F4.0%28Firefox%29&v=2", function(error, resp, html) {
    if (!error) {
      parseString(resp.body, function(err, result) {
        if (err) console.log(err);
        
        res.json(result.response.results[0]);
      });
    } 
  })

  

  
};

