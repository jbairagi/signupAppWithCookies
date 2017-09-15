var express = require('express');
var router = express.Router();
var manageProjects = require('./../controller/manageProjectController');
var check = require('./../middlewares/checks.js');

router.get('/addProjects', manageProjects.manageProjectNew);
router.post('/addProjects', check.isManager, manageProjects.projectCreate);
//router.post('/updateProjects', check.ismanager, manageProjects.projectUpdate);
//router.get('/getAssignedProjects', manageProjects.getAssignedProjects);

module.exports = router;
