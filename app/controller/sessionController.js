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
     User.find({'username': username},'+password', function(err, user){
       if(user[0]){
         bcrypt.compare(pass, user[0].password, function (err, result) {
           if(err){
             console.log(err);
           }
           if (result === true) {
             var secret = 'sseeccrreett'
             var token = jwt.sign({
               _id: user[0]._id.toHexString(),
               secret
             }, 'test123').toString();

             res.status(200).json(token);
             //
             User.findOneAndUpdate({'username': username}, {$set: {'token': token}}, function(err, response){
               if(err) console.log(err);
             });


             //save token
 					 }
 					 else{
             res.status(401).json({message:"Invalid credentials!"})
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
