var fs = require('fs');
var parse = require('csv-parse');
var User = require('mongoose').model('User');
var Contact = require('mongoose').model('Contact');
var request = require('request');
var cheerio = require('cheerio');


var scrapeGoogleSearch = function(url, user) {
  request(url, function(error, response, html) {
    if (!error) {
      var $ = cheerio.load(html);
      $linkedinUrl = $('cite').first().text();
      console.log($linkedinUrl);
      scrapeLinkedInProfile($linkedinUrl, user);
    } 
  });
};

var scrapeLinkedInProfile = function(url, user) {
  request(url, function(error, response, html) {
    if (!error) {
      var titles = [];
      var industries = [];
      var companies = [];
      var dates = [];
      var contactData = {};

      var $ = cheerio.load(html);

      contactData.name = $('.full-name').text();
      contactData.industry = $('.industry').text();
      contactData.experiences = [];

      var $dataContainer = $('#background-experience-container');

      // Find job titles
      $dataContainer.find('h4').each(function() {
        titles.push($(this).text());
      });

      // Find company name and company logo img
      var curObj = {};
      $dataContainer.find('h5').each(function() {
        if ($(this).attr('class') === undefined) {
          curObj.name = $(this).text();
          curObj.imgUrl = curObj.imgUrl || null;
          companies.push(curObj);
          curObj = {};
        } else {
          curObj.imgUrl = $(this).find('img').attr('data-li-src');
        }
      });

      // Find dates
      $dataContainer.find('.experience-date-locale').each(function(){
        dates.push($(this).text());
      });

      // // Populate experience object
      for (var i = 0; i < titles.length; i++) {
        contactData.experiences[i] = {
          title: titles[i],
          company: companies[i],
          date: dates[i]
        };
      }
      console.log(contactData.name);
      
      addContact(user, contactData);     
    }

  });
};

var addContact = function(user, contactData) {
  var currentContacts = user.contacts;
  var exists = false;
  if (contactData.name !== "") {
    for (var i = 0; i < currentContacts.length; i++) {
      if (currentContacts[i].name === contactData.name && currentContacts[i].experiences[currentContacts[i].experiences.length-1] === currentContacts[i].experiences[currentContacts[i].experiences.length-1]) {
        exists = true;
        console.log("CONTACT ALREADY EXISTS");
        continue;
      }
    }
    if (!exists) {
      var contacts = user.contacts;
      contacts.push({name: contactData.name, industry: contactData.industry, experiences: contactData.experiences});
      User.findOneAndUpdate({email: user.email}, {contacts: contacts}, function(err, user) {
        if (err) {console.log("ERROR UPDATING");}
        else {
          console.log("SUCCESSFULLY ADDED NEW CONTACT: ", contactData.name);
        }

      });
    }
  }
  
};

exports.acceptData = function(req, res) {
  var data = req.body.data;
  var contactCount = 100;
  User.findOne({_id: req.body['userId']}).exec( function(err, user) {

    //Randomize the timing of requests as a security protocol
    (function loop() {
      var rand = Math.round(Math.random() * (8000)) + 5000;

      setTimeout(function() {
        if (contactCount < data.length) {
          // Create a temp array that will be joined to contain the google search
          // The first google search result will be the public LinkedIn profile that we want to scrape
          var searchUrl = ["https://www.google.com/search?q=linkedin"];
          searchUrl.push(data[contactCount].firstName.split(" ").join("%20"));
          searchUrl.push(data[contactCount].lastName.split(" ").join("%20"));
          var company = data[contactCount].company.split(" ").join("%20");

          // If the contact has a company, search by company and title
          if (company) {
            searchUrl.push(company);
            searchUrl.push(data[contactCount].jobTitle.split(" ").join("%20"));
          } 
          // If the contact doesn't have a company, search by email instead
          else {
            searchUrl.push(data[contactCount].email.split(" ").join("%20"));
          }

          searchUrl = searchUrl.join("+");

          scrapeGoogleSearch(searchUrl, user);

          console.log(contactCount);
          contactCount += 1;
          loop();  
        }
      }, rand);
    }());

  });

  return res.send({success: true, message: 'Successful Upload'});
};


var downloadImage = function(url, filename, callback) {
  request.head(url, function(err, res, body) {
    var r = request(url).pipe(fs.createWriteStream(filename));
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);
    console.log(r);
    r.on('close', callback);
  });
};



// var parser = parse({delimiter: ','}, function(err, data) {
  //   console.log(data);
  //   var obj = {};

  //   // Loop through each row of data (excluding headers)
  //   // Each row of data represents one connection (person)
  //   for (var i = 1; i < 3; i++) {

  //     // Create a temp array that will be joined to contain the google search
  //     // The first google search result will be the public LinkedIn profile that we want to scrape

  //     var searchUrl = ["https://www.google.com/search?q=linkedin"];
  //     searchUrl.push(data[i][first_name_col].split(" ").join("%20"));
  //     searchUrl.push(data[i][last_name_col].split(" ").join("%20"));
  //     var company = data[i][company_col].split(" ").join("%20");

  //     // If the contact has a company, search by company and title
  //     if (company) {
  //       searchUrl.push(company);
  //       searchUrl.push(data[i][job_title_col].split(" ").join("%20"));
  //     } 
  //     // If the contact doesn't have a company, search by email instead
  //     else {
  //       searchUrl.push(data[i][email_col].split(" ").join("%20"))
  //     }

  //     searchUrl = searchUrl.join("+");
  //     scrapeGoogleSearch(searchUrl);
  //   }
    
  // });

  // req.busboy.on('file', function(fieldname, file, filename) {
  //   console.log("A");
  //   fs.createReadStream(filename).pipe(parser);
  // });
