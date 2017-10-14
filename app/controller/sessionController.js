const User = require('./../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

exports.sessionNew = function(req, res){
  res.render('login', {message: 'Log in'});
};

exports.sessionCreate = function(req, res){
   const username = req.body.username;
   const pass = req.body.password;
   if(!username || !pass){
     res.status(401).json({message:"Please enter all the fields"})
    //  res.render('login', {message: "Please enter all the fields"});
   }
   else{
     User.findOne({'username': username},'+password', function(err, user){
       if(user){
         bcrypt.compare(pass, user.password, function (err, result) {
           if(err){
             res.status(401).json({message:"Invalid credentials!"})
             console.log(err);
           }
           if (result === true) {
             var secret = 'sseeccrreett'
             var token = jwt.sign({
               _id: user._id.toHexString(),
               role: user.role,
               name: user.username,
               secret
             }, 'test123').toString();

             const data = {
               token: token,
               role: user.role
             }
             res.status(200).json({status: 200, data});
             User.findOneAndUpdate({'username': username}, {$set: {'token': token}}, function(err, response){
               if(err) console.log(err);
             });
 					 }
 					 else{
             res.status(401).json({status: 401, message:"Invalid credentials!"})
 					// 	 res.render('login', {message: "Invalid credentials!"});
 					 }
         });
        }
       else{
         res.status(401).json({message:"no such user found"});
       }
     });
   }
};

exports.sessionDestroy = function(req, res){
  res.clearCookie('loginId');
  delete req.user;
   res.redirect('/login');
};
