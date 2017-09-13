var User = require('./../models/db');

exports.sessionNew = function(req, res){
  res.render('login', {message: 'Log in'});
};

exports.sessionCreate = function(req, res){
   var username = req.body.username;
   var pass = req.body.password;
   if(!username || !pass){
     res.render('login', {message: "Please enter all the fields"});
   }
   else{
     User.find({'username': username, 'password': pass}, function(err, user){
       if(user[0]){
         res.cookie('loginId', user[0]._id, {httpOnly: true, signed: true, maxAge: 360000});
         res.redirect('/profile');
        }
       else{
         res.render('login', {message: "Invalid credentials!"});
       }
     });
   }
};

exports.sessionDestroy = function(req, res){
  res.clearCookie('loginId');
  delete req.user;
   res.redirect('/login');
};
