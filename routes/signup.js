var express = require('express');
var router = express.Router();
var signup = require('./../controller/signup');
var check = require('./../middlewares/checks.js');

router.get('/signup', check.userLoggedIn, signup.signupNew);
router.post('/signup', check.usernameTaken, signup.signupCreate);

module.exports = router;
