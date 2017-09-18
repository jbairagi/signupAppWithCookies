var express = require('express');
var router = express.Router();
var manageProjects = require('./../controller/manageProjectController');
var check = require('./../middlewares/checks.js');

router.get('/addProjects', manageProjects.manageProjectNew);
router.post('/addProjects', check.isManager, manageProjects.projectCreate);

router.post('/addProjectDeveloper', check.isManager, manageProjects.addProjectDeveloper);
router.post('/editProjectDescription', check.isManager, manageProjects.editProjectDescription);
router.post('/editProjectBeginningDate', check.isManager, manageProjects.editProjectBeginningDate);
router.post('/editProjectDueDate', check.isManager, manageProjects.editProjectDueDate);
//router.post('/removeProject', check.isManager, manageProjects.removeProject);

module.exports = router;
