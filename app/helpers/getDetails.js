var User = require('./../models/user');
var Project = require('./../models/project');

exports.getIdByUsername = function(username){
  return new Promise((resolve, reject) => {
    User.find({'username': username}, function(err, user){
      if (err) {
        console.log(err);
        return reject(err);
      }
      if(user.length){
        var a = user[0]._id;
        return resolve(a);
      }
      else
        console.log(username +  " is not registered");
    });
  })
}

exports.getIdByProject = function(title){
  Project.find({'title': title}, function(err, project){
    if(err)
      console.log(err);
    if(project[0])
      return project[0]._id;
    else
      console.log(title +  " is not registered");
  });
}
