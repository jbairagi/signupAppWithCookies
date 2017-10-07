var addUser = require('./../app/controller/addUserController');
var check = require('./../app/middlewares/checks.js');

module.exports = function(app, passport) {
  app.get('/addUser', check.isManager, addUser.addUserNew);
  app.post('/addUser', check.isManager, addUser.addUserCreate);
}
