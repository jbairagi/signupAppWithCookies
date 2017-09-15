var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
var cookieParser = require('cookie-parser');

var seed = require('./lib/seedManager.js');
seed.start();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.array());
app.use(cookieParser("secret"));

app.set('view engine', 'pug');
app.set('views', './views');

var addUser = require('./routes/addUserRoutes.js');
var session = require('./routes/sessionRoutes.js');
var profile = require('./routes/profileRoutes.js');
var projects = require('./routes/manageProjectsRoutes.js');

app.use(addUser);
app.use(session);
app.use(profile);
app.use(projects);

app.listen(3000);
