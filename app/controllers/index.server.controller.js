exports.render = function(req, res) {
  if (!req.user) {
    res.render('index',  {
      title: "Please work!",
      name: req.user ? req.user.fullName : ''
    });
  } else {
    res.render('app', {
      title: req.user.fullName
    });
  }
  
  
};