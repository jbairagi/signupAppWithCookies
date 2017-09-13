var express = require('express');
var router = express.Router();
var profile = require('./../controller/profile');

router.get('/profile', profile.profile);

module.exports = router;
