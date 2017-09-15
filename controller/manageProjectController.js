var User = require('./../models/user');
var Project = require('./../models/project');
//var helper = require('./../helpers/getDetails');

exports.manageProjectNew = function(req, res){
    res.redirect('/profile');
};

exports.projectCreate =  function(req, res){
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
                console.log(err);
                res.redirect('/login');
              }
              else {
                //console.log(project);
                // User.findById(dev, function(err, response){
                //   console.log(response);
                // });

                User.findByIdAndUpdate(dev, {$push: {'project': project._id}},
                  function(err, response){
                      //console.log(response);
                });
                console.log("up");
                res.redirect('/profile');
              }
            });
          }
          else{

            console.log(dev);
            Project.find({'title': title}, function(err, project){
              User.findByIdAndUpdate(dev, {$push: {'project': project._id}},
                function(err, response){
                    //console.log(response);
              });
            });
            res.redirect('/profile');
            console.log("down");




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

exports.getAssignedProjects = function(req, res){
  var user = req.userData;

};











// exports.projectCreate =  function(req, res){
//   var title = req.body.title;
//   var description = req.body.description;
//   var beginningDate = req.body.beginningDate;
//   var dueDate = req.body.dueDate;
//   var developer = req.body.developer;
//   console.log(developer);
//   developer = helper.getIdByUsername(developer);
//
//           //console.log(developer);
//           if(!title || !description || !beginningDate || !dueDate || !developer){
//             console.log("here");
//             res.send("Invalid details!");
//           }
//           else{
//             Project.count({'title': title}, function(err, count){
//               if(count === 0){
//                 var newProject = new Project({
//                   title: title,
//                   description: description,
//                   beginningDate: beginningDate,
//                   dueDate: dueDate,
//                   developer: developer
//                 });
//                 newProject.save(function(){
//                   if(err)
//                     console.log(err);
//                   else {
//                     res.render('profile');
//                   }
//                 });
//               }
//               else{
//                 res.render('show_message', {message: "Project already exists"});
//               }
//             });
//           }
// };
