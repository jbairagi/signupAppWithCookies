var express = require('express');
var router = express.Router();
var profile = require('./../app/controller/profileController');
var check = require('./../app/middlewares/checks.js');

router.get('/profile', check.assignUser, profile.profile);

module.exports = router;
