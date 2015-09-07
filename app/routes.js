// app/routes.js
var mongoose       = require('mongoose')
var athleteSchema  = require('./models/athleteScores');
var User           = require('./models/userModel')
var session        = require('express-session')
var nodemailer     = require('nodemailer');
var passport       = require('passport');
var LocalStrategy  = require('passport-local').Strategy;
var bcrypt         = require('bcrypt-nodejs');
var async          = require('async');
var crypto         = require('crypto');


module.exports = function(app) {

   // server routes ===========================================================
   // handle things like api calls
   // authentication routes

   // sample api route
   app.get('/api/athleteScores/:division', function(req, res) {

     AthleteScores = mongoose.model('AthleteScores', athleteSchema, req.params.division);
     // use mongoose to get all nerds in the database

     AthleteScores.find(function(err, scores) {

       // if there is an error retrieving, send the error. nothing after res.send(err) will execute
       if (err)
         res.send(err);

       var response = {
         "fran": scores[0].Fran,
         "helen": scores[0].Helen,
         "grace": scores[0].Grace,
         "filthy50": scores[0]["Filthy 50"],
         "fightGoneBad": scores[0]["Fight Gone Bad"],
         "sprint400m": scores[0]["Sprint 400m"],
         "run5k": scores[0]["Run 5k"],
         "cleanAndJerk": scores[0]["Clean & Jerk"],
         "snatch": scores[0].Snatch,
         "deadlift": scores[0].Deadlift,
         "backSquat": scores[0]["Back Squat"],
         "maxPullups": scores[0]["Max Pull-ups"]
       };
       //console.log(response);
       res.send(response); // return all scores in JSON format
     });
   });


   app.get('/api/users', function(req, res) {
     User.find(function(err, users) {

       // if there is an error retrieving, send the error. nothing after res.send(err) will execute
       if (err)
         res.send(err);

       //console.log(users);
       res.json(users); // return all users
     });
   });


   app.get('/api/users/:username', function(req, res) {
     User.findOne({"username": new RegExp('^'+req.params.username+'$', "i")}, function(err, user) {
          if (err)
              res.send(err);
          res.json(user);
      });
   });

   app.post('/api/users', function(req, res) {
      var user = new User();
      user.firstName = req.body.firstName;  // set the user's name (comes from the request)
      user.lastName = req.body.lastName;
      user.username = req.body.username;
      user.password = req.body.password;

      user.save(function(err) {
        req.logIn(user, function(err) {
          var smtpTransport = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
              user: 'crossfitanalytics@gmail.com',
              pass: 'malibu1993'
            }
          });
          var mailOptions = {
            to: user.username,
            from: 'crossfitanalytics@gmail.com',
            subject: 'Welcome to CrossFit Analytics, '+user.firstName+'!',
            text: 'Dear '+user.firstName+','+'\n\n'+
              'Thank you for signing up for a CrossFit Analytics account! You can use your account to save your scores and times to quickly perform comparisons and analyses.'+'\n'+
              'You can now access your profile and update your information at http://' + req.headers.host + '/profile/.'+'\n\n' +
              'CrossFit Analytics is still in its early stages, so we recommend that you check back frequently for new content and analytical tools.'+'\n\n' +
              'Finally, if you have any questions or comments, please do not hesitate to contact us at crossfitanalytics@gmail.com.'+ '\n\n' +
              'We look forward to working with you!\n-The CrossFit Analytics Team'

          };
          smtpTransport.sendMail(mailOptions, function(err) {
            res.redirect('/');
          });

        });
      });
     /**var user = new User();      // create a new instance of the User model
     user.firstName = req.body.firstName;  // set the user's name (comes from the request)
     user.lastName = req.body.lastName;
     user.username = req.body.username;
     user.password = req.body.password;

     // save the user and check for errors
     user.save(function(err) {
       if (err) {
          res.send(err);
        }
       res.end('{"success" : "Updated Successfully", "status" : 200}');
     });*/
   });

   app.put('/api/users/:username', function(req, res) {
     // use our user model to find the user we want
        User.findOne({ username: req.params.username }, function(err, user) {
          if (err) {
            res.send(err);
          } else {
            user.firstName = req.body.firstName;  // update the user's info
            user.lastName = req.body.lastName;
            user.username = req.body.username;
            user.password = req.body.password;
            user.fran = req.body.fran;
            user.grace = req.body.grace,
            user.helen = req.body.helen,
            user.filthy50 = req.body.filthy50,
            user.fightGoneBad = req.body.fightGoneBad,
            user.sprint400m = req.body.sprint400m,
            user.run5k = req.body.run5k,
            user.cleanAndJerk = req.body.cleanAndJerk,
            user.snatch = req.body.snatch,
            user.deadlift = req.body.deadlift,
            user.backSquat = req.body.backSquat,
            user.pullups = req.body.pullups

            // save the user
            user.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'User updated!' });
            });
          }
        });
   });

   app.delete('/api/users/:username', function(req, res) {
     User.remove({
        username: req.params.username
        }, function(err, user) {
            if (err)
                res.send(err);
            res.json({ message: 'User successfully deleted' });
        });
   });

    app.post('/api/login', function(req, res, next) {
      passport.authenticate('local', function(err, user, info) {
        if (err) {
          res.send({ success: false, message: err });
        } else {
          if (!user) {
            res.send({ success: false, message: 'Username or password is incorrect' });
          } else {
            req.logIn(user, function(err) {
              if (err) {
                res.send({ success: false, message: err });
              } else {
                res.json({ success: true });
              }
            });
          }
        }
      })(req, res, next);
    });

   app.post('/forgot', function(req, res, next) {
      async.waterfall([
        function(done) {
          crypto.randomBytes(20, function(err, buf) {
            var token = buf.toString('hex');
            done(err, token);
          });
        },
        function(token, done) {
          User.findOne({ username: req.body.username }, function(err, user) {
            if (!user) {
              return res.send({success: false, message: 'No account with that email address exists.'});
            }

            user.resetPasswordToken = token;
            user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

            user.save(function(err) {
              done(err, token, user);
            });
          });
        },
        function(token, user, done) {
          var smtpTransport = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
              user: 'crossfitanalytics@gmail.com',
              pass: 'malibu1993'
            }
          });
          var mailOptions = {
            to: user.username,
            from: 'crossfitanalytics@gmail.com',
            subject: 'CrossFit Analytics Password Reset',
            text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
              'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
              'http://' + req.headers.host + '/reset/' + token + '\n\n' +
              'If you did not request this, please ignore this email and your password will remain unchanged.'+ '\n\n' +
              'Have a great day!\n-The CrossFit Analytics Team'

          };
          smtpTransport.sendMail(mailOptions, function(err) {
            done(err, 'done');
            return res.json({success: true});
          });
        }
      ], function(err) {
        if (err) return res.json({success: false, message: err });
        //res.redirect('/forgot');
      });
    });

    app.get('/checkReset/:token', function(req, res) {
      User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
        if (!user) {
          return res.json( {success: false, message:'Password reset token is invalid or has expired.'} );
        }
        //console.log(user);
        return res.json(user);
      });
    });

    app.post('/reset/:token', function(req, res) {
      async.waterfall([
        function(done) {
          User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
            if (!user) {
              return res.redirect('back');
            }
            //console.log("In reset");
            //console.log(req.body);
            //console.log(user);
            user.password = req.body.newPassword;
            user.resetPasswordToken = undefined;
            user.resetPasswordExpires = undefined;

            user.save(function(err) {
              //console.log("Logged In");
              req.logIn(user, function(err) {
                done(err, user);
              });
            });
          });
        },
        function(user, done) {
          //console.log(user);
          var smtpTransport = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
              user: 'crossfitanalytics@gmail.com',
              pass: 'malibu1993'
            }
          });
          var mailOptions = {
            to: user.username,
            from: 'crossfitanalytics@gmail.com',
            subject: 'Your CrossFit Analytics password has been changed',
            text: 'Hello,\n\n' +
              'This is a confirmation that the password for your CrossFit Analytics account ' + user.username + ' has just been changed.\n\n'+
              'If you did not authorize this change, please visit '+'http://' + req.headers.host + '/forgot to request another password reset.' +'\n\n'+
              'Have a great day!\n-The CrossFit Analytics Team'
          };
          smtpTransport.sendMail(mailOptions, function(err) {
            //console.log(mailOptions);
            done(err);
          });
        }
      ], function(err) {
        res.redirect('/');
      });
    });

    /*app.get("/:route", function(req, res) {
      res.redirect(req.params.route);
    });
    */

   // frontend routes =========================================================
   // route to handle all angular requests
   app.get('/*', function(req, res){
      res.sendfile('./public/index.html');
   });

 };
