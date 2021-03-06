var express = require('express');
var router = express.Router();
var session = require('./../app/controller/sessionController');
var check = require('./../app/middlewares/checks.js');

router.get('/', function(req, res){
  res.redirect('/login');
});
router.get('/login', check.userLoggedIn, session.sessionNew);
router.post('/login', session.sessionCreate);

router.get('/logout', session.sessionDestroy);

module.exports = router;
