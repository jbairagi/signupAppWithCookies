var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var validator = require('express-validator');
var customValidators = require('./app/helpers/customValidation');
var cors = require('./app/config/corsConfig');
var thePort = process.env.PORT || 3000;

var seed = require('./app/seed/seedManager.js');
seed.start();

app.use(cors.config);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser("secret"));
app.use(validator(customValidators));

app.set('view engine', 'pug');
app.set('views', './app/views');
app.use(express.static('public'));

var addUser = require('./routes/addUserRoutes');
var session = require('./routes/sessionRoutes');
var profile = require('./routes/profileRoutes');
var projects = require('./routes/manageProjectsRoutes');
var authenticate = require('./app/config/auth');

app.use(session);
app.use(authenticate.user);
app.use(addUser);
app.use(profile);
app.use(projects);

app.listen(thePort);
