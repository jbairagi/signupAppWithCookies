var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');
const bcrypt = require('bcrypt');

module.exports = function(passport) {
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
  });

  passport.use('local-login', new LocalStrategy({
    usernameField : 'username',
    passwordField : 'password',
    passReqToCallback : true
  },
  function(req, username, password, done) {
    User.findOne({ 'username' :  username }, '+password', function(err, user) {
      if (err)
        return done(err);

      if (!user)
        return done(null, false);

      console.log(username + ' ' + password);

      bcrypt.compare(password, user.password, function (err, result) {
        if (err)
          return done(err);

        if (result === true){
          console.log(result);
          return done(null, user);
        }

        else
          return done(null, false);

      });
    });
  }));
};
