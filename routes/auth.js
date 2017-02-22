var passport = require('passport');
var User = require('../models/user');
var express = require('express');
var router = express.Router();
var passport = require('passport');

router.route('/register')
  .get(function(req, res, next) {
    res.render('register', {});
  })
  .post(function(req, res, next) {

      function checkUserName()
       {
          var userName = req.body.username;
          var invalidChars = new RegExp(/[~.`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?0123456789]/);
          if (invalidChars.test(userName))
           {
              return false;
           }
          return true;
       }
      function checkEmail()
       {
          var emailAdd = req.body.email_add;
          var invalidChars = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
          if (!invalidChars.test(emailAdd))
           {
              return false;
           }
          return true;
       }
      function checkFirstName()
       {
          var inputName = req.body.first_name;
          var alpha = new RegExp(/^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/);  
          if (!alpha.test(inputName))
           {   
              return false;
           }
          return true;
       }
      function checkLastName()
       {
          var inputName = req.body.last_name;
          var alpha = new RegExp(/^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/);  
          if (!alpha.test(inputName))
           {   
              return false;
           }
          return true;
       }

      //Check Username
        if(req.body.username.length < 8)
         {
            return res.render('register', {errorLogUser: "Username must not be less than 8 characters!"});
         }
        else if(req.body.username.length > 20)
         {
            return res.render('register', {errorLogUser: "Username must be less than 20 characters!"});
         }
        else if (checkUserName() === false)
         {
            return res.render('register', {errorLogUser: "Invalid username input!"});
         }

      //Check First Name
        if(checkFirstName() === false)
         {
            return res.render('register', {errorLogFirstName: "Invalid first name!"});
         }

      //Check Last Name
        if (checkLastName() === false)
         {
            return res.render('register', {errorLogLastName: "Invalid last name!"});
         }

      //Check Email
        if(checkEmail() === false)
         {
            return res.render('register', {errorLogEmail: "Invalid email address!"});
         }
      
        else
          {
            User.register(new User({username: req.body.username}), req.body.password, function(err, account) {
              if(err) {
                console.log(err);
                return res.render('register', {errorLog: err.toString().substring(err.toString().indexOf(":") + 1)});
              }
              else
               {
                  req.login(account, function(err)
                   {
                      res.redirect('/kickstarters/list');
                   });
               }
            })
          }
  })

router.get('/login', function(req, res, next) {
  res.render('login', {user: req.user});
});

router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    req.login(user, function(err) {
      if (err)
       {
          res.render('login', {errorLog: "Invalid username or password!"});
          return next(err);
       }
      return res.redirect('/kickstarters/list');
    });
  })(req, res, next);
});

router.all('/logout', function(req, res, next) {
  req.logout();
  res.redirect('/');
});

module.exports = router;