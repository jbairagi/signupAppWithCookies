var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var validator = require('express-validator');
var customValidators = require('./app/helpers/customValidation');
var thePort = process.env.PORT || 3000;

var seed = require('./app/seed/seedManager.js');
seed.start();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3001");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", " Content-Type, auth-token");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser("secret"));
//app.use(validator([]));

app.use(validator(customValidators));

app.set('view engine', 'pug');
app.set('views', './app/views');
app.use(express.static('public'));

var addUser = require('./routes/addUserRoutes');
var session = require('./routes/sessionRoutes');
var profile = require('./routes/profileRoutes');
var projects = require('./routes/manageProjectsRoutes');
// var validateUser = require('./app/helpers/getDetails');
//
// app.use(validateUser);
app.use(addUser);
app.use(session);
app.use(profile);
app.use(projects);

app.listen(thePort);
