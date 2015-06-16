exports.render = function(req, res) {
  if (!req.user) {
    res.render('index',  {
      title: "Please work!",
      name: req.user ? req.user.fullName : ''
    });
  } else {
    res.render('/../../public/app.html', {
      title: req.user.fullName
    });
  }
  
  
};