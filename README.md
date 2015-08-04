# Job Finder Application
Ben Steinberg

Solo Project

In this application, users can upload a CSV file of their LinkedIn contacts and see a list of jobs at companies where they have first degree connections.  For each contact (row in CSV file) that a user uploads, a throttled scraper will first search Google with a custom build query to find that user's public LinkedIn profile, then will scrape the public profile page for current and previous employment information.

The backend was built with Node.js/Express, MongoDB, Mongoose and PassportJS (local auth).

The frontend was built with AngularJS
