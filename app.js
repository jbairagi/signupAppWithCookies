var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var flash    = require('connect-flash');
var validator = require('express-validator');
var session      = require('express-session');
var customValidators = require('./app/helpers/customValidation');
var thePort = process.env.PORT || 3000;
require('./app/config/passport')(passport);

var seed = require('./app/seed/seedManager.js');
seed.start();

app.set('view engine', 'pug');
app.set('views', './app/views');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3001");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(validator(customValidators));
app.use(express.static('public'));
app.use(session({
  secret: 'itisasecret',
  resave: true,
  saveUninitialized: true
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash());

require('./routes/addUserRoutes.js')(app, passport);
require('./routes/sessionRoutes.js')(app, passport);
require('./routes/profileRoutes.js')(app, passport);
require('./routes/manageProjectsRoutes.js')(app, passport);


app.listen(thePort);
