var express = require('express');
var router = express.Router();
var session = require('./../controller/session');
var check = require('./../middlewares/checks.js');

router.get('/login', check.userLoggedIn, session.sessionNew);
router.post('/login', check.authenticate, session.sessionCreate);

router.get('/logout', session.sessionDestroy);

module.exports = router;
