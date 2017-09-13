var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
var cookieParser = require('cookie-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.array());
app.use(cookieParser("secret"));

app.set('view engine', 'pug');
app.set('views', './views');

var signup = require('./routes/signup.js');
var session = require('./routes/session.js');
var profile = require('./routes/profile.js');

app.use(signup);
app.use(session);
app.use(profile);
app.listen(3000);
