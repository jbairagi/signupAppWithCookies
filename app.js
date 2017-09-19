var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var thePort = process.env.PORT || 3000;

var seed = require('./db/seed/seedManager.js');
seed.start();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser("secret"));

app.set('view engine', 'pug');
app.set('views', './app/views');

var addUser = require('./app/routes/addUserRoutes.js');
var session = require('./app/routes/sessionRoutes.js');
var profile = require('./app/routes/profileRoutes.js');
var projects = require('./app/routes/manageProjectsRoutes.js');

app.use(addUser);
app.use(session);
app.use(profile);
app.use(projects);

app.listen(thePort);
