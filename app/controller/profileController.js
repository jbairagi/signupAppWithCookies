var User = require('./../models/user');
var Project = require('./../models/project');

exports.profile = function(req, res){
  var user = req.user;
  User.findOne({'username' : user.username}, {'_id': 0}).populate('project').exec(function(err,result){
  	if (err) res.render('show_message', {message: err});
  	else if (result == undefined){
  		res.render('show_message', {message: "Invalid Access!"});
  	}
    else{
        res.render('profile', {username: result.username, type: user.role, result: result.project});
    }
  });
};
