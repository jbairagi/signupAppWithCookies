var express = require('express');
var router = express.Router();
var addUser = require('./../app/controller/addUserController');
var check = require('./../app/middlewares/checks.js');

router.get('/addUser',  check.assignUser, addUser.addUserNew);//check
router.post('/addUser', check.isManager, addUser.addUserCreate);

module.exports = router;
