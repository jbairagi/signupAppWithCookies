var express = require('express');
var router = express.Router();
var addUser = require('./../controller/addUserController');
var check = require('./../middlewares/checks.js');

router.get('/addUser',  check.assignUser, addUser.addUserNew);
router.post('/addUser', check.isManager, addUser.addUserCreate);

module.exports = router;
