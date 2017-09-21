var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var validator = require('express-validator');
var customValidators = require('./app/helpers/customValidation');
var thePort = process.env.PORT || 3000;

var seed = require('./app/seed/seedManager.js');
seed.start();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser("secret"));
//app.use(validator([]));

app.use(validator(customValidators));

app.set('view engine', 'pug');
app.set('views', './app/views');
app.use(express.static('public'));

var addUser = require('./routes/addUserRoutes.js');
var session = require('./routes/sessionRoutes.js');
var profile = require('./routes/profileRoutes.js');
var projects = require('./routes/manageProjectsRoutes.js');

app.use(addUser);
app.use(session);
app.use(profile);
app.use(projects);

app.listen(thePort);
