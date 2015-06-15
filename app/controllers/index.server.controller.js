exports.render = function(req, res) {
  
  res.render('index',  {
    title: "Please work!",
    name: req.user ? req.user.fullName : ''
  });
  
};