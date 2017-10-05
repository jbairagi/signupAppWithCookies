var express = require('express');
var router = express.Router();
var profile = require('./../app/controller/profileController');
var check = require('./../app/middlewares/checks.js');

function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated()){
      return next();
    }

    // if they aren't redirect them to the home page
    res.redirect('/');
}

router.get('/profile', isLoggedIn, profile.profile);

module.exports = router;
