var session = require('./../app/controller/sessionController');
var check = require('./../app/middlewares/checks.js');


module.exports = function(app, passport) {
  app.get('/', function(req, res){
    res.redirect('/login');
  });

  app.get('/login', check.userLoggedIn, session.sessionNew);
  app.post('/login', session.sessionCreate);

  app.get('/logout', session.sessionDestroy);
}
