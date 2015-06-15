exports.render = function(req, res) {
  console.log("TEST");
  res.render('index',  {
    title: "Please work!"
  });
};