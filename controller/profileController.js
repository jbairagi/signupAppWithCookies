var User = require('./../models/user');

exports.profile = function(req, res){
  var user = req.userData;
  // for(var i=0; i<user){
  //
  // }
  console.log(user.project);
  res.render('profile', {username: user.username, type: user.role, projects: user.project});
};
