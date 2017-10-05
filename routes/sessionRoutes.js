var session = require('./../app/controller/sessionController');
var check = require('./../app/middlewares/checks.js');


module.exports = function(app, passport) {
  app.get('/', function(req, res){
    res.redirect('/login');
  });

  app.get('/login', check.userLoggedIn, session.sessionNew);
  // app.post('/login', session.sessionCreate);
  app.post('/login', passport.authenticate('local-login', {
    successRedirect : '/profile', // redirect to the secure profile section
    failureRedirect : '/login', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
  }));

  app.get('/logout', session.sessionDestroy);
}

//
//
// app.post('/login', passport.authenticate('local-login', {
//         successRedirect : '/profile', // redirect to the secure profile section
//         failureRedirect : '/login', // redirect back to the signup page if there is an error
//         failureFlash : true // allow flash messages
//     }));
