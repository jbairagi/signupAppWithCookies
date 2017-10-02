var User = require('./../models/user');
var Project = require('./../models/project');

exports.getIdByUsername = function(username){
  Promise.all((resolve, reject) => {
    User.find({'username': username}, function(err, user){
      if (err) {
        console.log(err);
        return reject(err);
      }
      if(user[0]){
        var a = user[0]._id;
        console.log(a);
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
