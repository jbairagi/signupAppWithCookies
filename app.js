var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var validator = require('express-validator');

var thePort = process.env.PORT || 3000;

var seed = require('./app/seed/seedManager.js');
seed.start();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser("secret"));
//app.use(validator([]));

app.use(validator({
  customValidators: {
    isDateValid: function(dateString){
    var regEx = /^\d{4}-\d{2}-\d{2}$/;
    if(!dateString.match(regEx)) return false;  // Invalid format
    var d = new Date(dateString);
    //var dNow = new Date();
    if(!d.getTime()) return false; // Invalid date (or this could be epoch)
    return d.toISOString().slice(0,10) === dateString;
    }
    // containsTwoTags: function (input) {
    //   var tags = input.split(',');
    //   // Remove empty tags
    //   tags = tags
    //     .filter(function(tag) { return /\S/.test(tag) });
    //   // Remove duplicate tags
    //   tags = tags
    //     .filter(function(item, pos, self) {
    //       return self.indexOf(item) == pos;
    //     });
    //   return tags.length <= 2;
    // }
  }
}));


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
