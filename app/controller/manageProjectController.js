var User = require('./../models/user');
var Project = require('./../models/project');
var helpers = require('./../helpers/getDetails');
const bcrypt = require('bcrypt');

exports.manageProjectNew = function(req, res){
  res.redirect('/profile');
};

exports.getProjects = (req, res) => {
  var username = req.body.username;
  if(!username){
    res.status(400).json("Please provide valid data");
  }
  else{
    helpers.getProjectsByUsername(username).then((projects) => {
      res.status(200).json(projects);
    }).catch(err => {res.status(400).json(err);});
  }
  // var pass = req.body.password;
  // if(!username || !pass){
  //   res.status(400).json("Please provide valid login credentials");
  // }
  // else{
  //   helpers.validateUser(username, pass).then((result) => {
  //     helpers.getProjectsByUsername(username).then((projects) => {
  //       res.status(200).json(projects);
  //     }).catch(err => {res.status(400).json(err);});
  //   }).catch(err => {res.status(400).json(err);});
  // }
}

exports.projectCreate = function(req, res){
  console.log(req.body.beginningDate);
  req.checkBody('title', 'Title is required').notEmpty();
  req.checkBody('description', 'Description is required').notEmpty();
  req.checkBody('beginningDate', 'Beginning Date is required').notEmpty();
  req.checkBody('beginningDate', 'Beginning Date is invalid').isDateValid();
  req.checkBody('beginningDate', 'Beginning Date is less than todays date').isBeginningValid();
  req.checkBody('dueDate', 'Due Date is required').notEmpty();
  req.checkBody('dueDate', 'Due Date should be greater than Beginning Date').isDueDateValid(req.body.beginningDate);
  req.checkBody('dueDate', 'Due Date is invalid').isDateValid();
  req.checkBody('developer', 'Developer is required').notEmpty();
  var errors = req.validationErrors();
  if(errors){
    let userId = req.user._id;
    if(userId){
      User.findById(userId, (err, user) => {
          if (err)
            console.log(err);
          res.render('profile', {err: errors, check: "addProjectValidationError", username: user.username, type: user.role, result: user.project, message: "Try adding again!"});
        });
    }
    else{
      res.redirect('/login');
    }
  }
  else{
    var title = req.body.title;
    var description = req.body.description;
    var beginningDate = req.body.beginningDate;
    var dueDate = req.body.dueDate;
    var developer = req.body.developer;

    helpers.getIdByUsername(developer).then((id) => {
      console.log(id);
    }).catch(err => {console.log(err);});

    User.find({'username': developer}, function(err, user){
      if(err)
        console.log(err);
      if(user[0]){
        dev = user[0]._id;
        if(!title || !description || !beginningDate || !dueDate || !dev) console.log("Invalid details!");
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
                if(err) res.redirect('/login');
                else{
                  User.findByIdAndUpdate(dev, {$push: {'project': project._id}}, function(err, response){
                    if(err) console.log(err);
                  });
                }
              });
            }
            else console.log("Project already exists. Update project details to add a developer");
          });
        }
      }
      else console.log(developer +  " is not registered");
    });
    res.redirect('/profile');
  }
};

exports.addProjectDeveloper = function(req, res){
  req.checkBody('title', 'Title is required').notEmpty();
  req.checkBody('developer', 'Developer is required').notEmpty();
  var errors = req.validationErrors();
  if(errors){
    // console.log(errors);
    res.render('addUser', {err: errors, type: "addDeveloperValidationError", message: "Try adding again!"});
  }
  else{
    var title = req.body.title;
    var developer = req.body.developer;
    User.find({'username': developer}, function(err, user){
      if(err) console.log(err);
      if(user[0]){
        dev = user[0]._id;
        if(!title || !dev){
          res.send("Invalid details!");
        }
        else{
          Project.count({'title': title}, function(err, count){
            if(count === 0) console.log("Project " + title + " is not added. First add the project.");
            else{
              Project.findOneAndUpdate({'title': title}, {$push: {'developers': dev}}, function(err, project){
                if(err) console.log(err);
                User.findByIdAndUpdate(dev, {$push: {'project': project._id}},function(err, user){
                  if(err) console.log(err);
                });
              });
            }
          });
        }
      }
      else console.log(developer +  " is not registered");
      res.redirect('/profile');
    });
  }
};

exports.editProjectDescription = function(req, res){
  req.checkBody('title', 'Title is required').notEmpty();
  req.checkBody('description', 'Description is required').notEmpty();

  var errors = req.validationErrors();
  if(errors){
    // console.log(errors);
    res.render('profile', {err: errors, type: "editDescriptionValidationError", message: "Try adding again!"});
  }
  else{
    var title = req.body.title;
    var description = req.body.description;
    Project.count({'title': title}, function(err, count){
      if(count === 0) console.log("Project " + title + " is not added. First add the project.");
      else{
        Project.findOneAndUpdate({'title': title}, {'description': description}, function(err, project){
          if(err) console.log(err);
        });
      }
      res.redirect('/profile');
    });
  }
};

exports.editProjectBeginningDate = function(req, res){
  req.checkBody('title', 'Title is required').notEmpty();
  req.checkBody('beginningDate', 'Beginning Date is required').notEmpty();

  var errors = req.validationErrors();
  if(errors){
    res.render('profile', {err: errors, type: "editBeginningValidationError", message: "Try adding again!"});
  }
  else{
    var title = req.body.title;
    var beginningDate = req.body.beginningDate;
    Project.count({'title': title}, function(err, count){
      if(count === 0) console.log("Project " + title + " is not added. First add the project.");
      else{
        Project.findOneAndUpdate({'title': title}, {'beginningDate': beginningDate}, function(err, project){
          if(err) console.log(err);
        });
      }
      res.redirect('/profile');
    });
  }
};

exports.editProjectDueDate = function(req, res){
  req.checkBody('title', 'Title is required').notEmpty();
  req.checkBody('dueDate', 'Due Date is required').notEmpty();

  var errors = req.validationErrors();
  if(errors){
    // console.log(errors);
    res.render('profile', {err: errors, type: "editDueValidationError", message: "Try adding again!"});
  }
  else{
    var title = req.body.title;
    var dueDate = req.body.dueDate;
    Project.count({'title': title}, function(err, count){
      if(count === 0) console.log("Project " + title + " is not added. First add the project.");
      else{
        Project.findOneAndUpdate({'title': title}, {'dueDate': dueDate}, function(err, project) {
          if(err) console.log(err);
        });
      }
      res.redirect('/profile');
    });
  }
};

exports.removeProject = function(req, res){
  req.checkBody('title', 'Title is required').notEmpty();
  var errors = req.validationErrors();
  if(errors){
    // console.log(errors);
    res.render('addUser', {err: errors, type: "addDeveloperValidationError", message: "Try adding again!"});
  }
  else{
    var title = req.body.title;
    Project.find({'title': title}, function(err, project){
      if(err) console.log(err);
      if(!project[0]) console.log("Project " + title + " doesn't exists!");
      else if(project){
        var id = project[0]._id;
        User.update({}, {$pull: {'project': id}}, {multi: true}, function(err, response){
          if(err) console.log(err);
        });
        Project.findByIdAndRemove(id, {multi: true}, function(err, response){
          if(err) console.log(err);
        });
      }
      res.redirect('/profile');
    });
  }
};
