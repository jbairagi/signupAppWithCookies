var manageProjects = require('./../app/controller/manageProjectController');
var check = require('./../app/middlewares/checks.js');


module.exports = function(app, passport) {
  app.get('/addProjects', manageProjects.manageProjectNew);
  app.post('/addProjects', check.isManager, manageProjects.projectCreate);

  app.post('/projects', manageProjects.getProjects);

  app.post('/addProjectDeveloper', check.isManager, manageProjects.addProjectDeveloper);
  app.post('/editProjectDescription', check.isManager, manageProjects.editProjectDescription);
  app.post('/editProjectBeginningDate', check.isManager, manageProjects.editProjectBeginningDate);
  app.post('/editProjectDueDate', check.isManager, manageProjects.editProjectDueDate);
  app.post('/removeProject', check.isManager, manageProjects.removeProject);
}
