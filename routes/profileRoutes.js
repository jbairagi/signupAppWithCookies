var express = require('express');
var router = express.Router();
var profile = require('./../controller/profileController');
var check = require('./../middlewares/checks.js');

router.get('/profile', check.assignUser, profile.profile);

module.exports = router;
