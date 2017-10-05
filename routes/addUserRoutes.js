var addUser = require('./../app/controller/addUserController');
var check = require('./../app/middlewares/checks.js');

module.exports = function(app, passport) {
  app.get('/addUser', check.isManager, addUser.addUserNew);
  app.post('/addUser', check.isManager, addUser.addUserCreate);
}



app.post('/signup', passport.authenticate('local-signup', {
  successRedirect : '/profile', // redirect to the secure profile section
  failureRedirect : '/signup', // redirect back to the signup page if there is an error
  failureFlash : true // allow flash messages
}));
