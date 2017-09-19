var User = require('./../models/user');
var Project = require('./../models/project');
//var helper = require('./../helpers/getDetails');

exports.manageProjectNew = function(req, res){
    res.redirect('/profile');
};

exports.projectCreate = function(req, res){
  var title = req.body.title;
  var description = req.body.description;
  var beginningDate = req.body.beginningDate;
  var dueDate = req.body.dueDate;
  var developer = req.body.developer;
  //console.log(developer);
  User.find({'username': developer}, function(err, user){
    if(err)
      console.log(err);
    if(user[0]){
      dev = user[0]._id;
      if(!title || !description || !beginningDate || !dueDate || !dev){
        res.send("Invalid details!");
      }
      else{
        Project.count({'title': title}, function(err, count){
          if(count === 0){
            var newProject = new Project({
              title: title,
              description: description,
              beginningDate: beginningDate,
              dueDate: dueDate,
              developers: dev
            });
            newProject.save(function(err, project){
              if(err){
                //console.log(err);
                res.redirect('/login');
              }
              else{
                User.findByIdAndUpdate(dev, {$push: {'project': project._id}},
                  function(err, response){
                      //console.log(response);
                });
                //console.log("up");
                res.redirect('/profile');
              }
            });
          }
          else{
            console.log("Project already exists. Update project details to add a developer");
            res.redirect('/profile');
            //console.log("down");
          }
        });
      }
    }
    else{
      console.log(developer +  " is not registered");
      res.redirect('/profile');
    }
  });
};

exports.addProjectDeveloper = function(req, res){
  var user = req.userData;
  var title = req.body.title;
  var developer = req.body.developer;
  User.find({'username': developer}, function(err, user){
    if(err)
      console.log(err);
    if(user[0]){
      dev = user[0]._id;
      if(!title || !dev){
        res.send("Invalid details!");
      }
      else{
        Project.count({'title': title}, function(err, count){
          if(count === 0){
            console.log("Project " + title + " is not added. First add the project.");
            res.redirect('/profile');
          }
          else{
            //console.log(dev);
            Project.findOneAndUpdate({'title': title}, {$push: {'developers': dev}}, function(err, project){
              //console.log(project);
              User.findByIdAndUpdate(dev, {$push: {'project': project._id}},function(err, user){
                //console.log(user);
              });
            });
            res.redirect('/profile');
            //console.log("down");
          }
        });
      }
    }
    else{
      console.log(developer +  " is not registered");
      res.redirect('/profile');
    }
  });
};

exports.editProjectDescription = function(req, res){
  var user = req.userData;
  var title = req.body.title;
  var description = req.body.description;
  Project.count({'title': title}, function(err, count){
    if(count === 0){
      console.log("Project " + title + " is not added. First add the project.");
      res.redirect('/profile');
    }
    else{
      //console.log(dev);
      Project.findOneAndUpdate({'title': title}, {'description': description}, function(err, project) {
        //console.log(project);
      });
      res.redirect('/profile');
      //console.log("down");
    }
  });
};

exports.editProjectBeginningDate = function(req, res){
  var user = req.userData;
  var title = req.body.title;
  var beginningDate = req.body.beginningDate;
  Project.count({'title': title}, function(err, count){
    if(count === 0){
      console.log("Project " + title + " is not added. First add the project.");
      res.redirect('/profile');
    }
    else{
      //console.log(dev);
      Project.findOneAndUpdate({'title': title}, {'beginningDate': beginningDate}, function(err, project) {
        //console.log(project);
      });
      res.redirect('/profile');
      //console.log("down");
    }
  });
};

exports.editProjectDueDate = function(req, res){
  var user = req.userData;
  var title = req.body.title;
  var dueDate = req.body.dueDate;
  Project.count({'title': title}, function(err, count){
    if(count === 0){
      console.log("Project " + title + " is not added. First add the project.");
      res.redirect('/profile');
    }
    else{
      //console.log(dev);
      Project.findOneAndUpdate({'title': title}, {'dueDate': dueDate}, function(err, project) {
      //  console.log(project);
      });
      res.redirect('/profile');
      //console.log("down");
    }
  });
};

// exports.removeProject = function(req, res){
//   var user = req.userData;
//   var title = req.body.title;
//   Project.find({'title': title}, function(err, project){
//     if(err) console.log(err);
//     if(project){
//       console.log(project[0]._id);
//       Project.findByIdAndRemove(project[0]._id);
//       res.redirect('/profile');
//     }
//     else{
//       console.log();
//       res.redirect('/profile');
//     }
//   });
// };
