var profile = require('./../app/controller/profileController');
var check = require('./../app/middlewares/checks.js');

module.exports = function(app, passport) {
  app.get('/profile', check.isLoggedIn, profile.profile);
}
