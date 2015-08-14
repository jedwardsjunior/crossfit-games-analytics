// app/routes.js
var mongoose = require('mongoose')
var athleteSchema = require('./models/athleteScores');
var User = require('./models/userModel')

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
       console.log(response);
       res.send(response); // return all scores in JSON format
     });
   });


   app.get('/api/users', function(req, res) {
     User.find(function(err, users) {

       // if there is an error retrieving, send the error. nothing after res.send(err) will execute
       if (err)
         res.send(err);

       console.log(users);
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
     var user = new User();      // create a new instance of the User model
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
     });
   });

   app.put('/api/users/:user_id', function(req, res) {
     // use our user model to find the user we want
        User.findById(req.params.user_id, function(err, user) {
          if (err)
              res.send(err);

          user.firstName = req.body.firstName;  // update the user's info
          user.lasttName = req.body.lastName;
          user.username = req.body.username;
          user.password = req.body.password;

          // save the user
          user.save(function(err) {
              if (err)
                  res.send(err);

              res.json({ message: 'User updated!' });
          });
        });
   });

   app.delete('/api/users/:user_id', function(req, res) {
     User.remove({
        _id: req.params.user_id
        }, function(err, user) {
            if (err)
                res.send(err);
            res.json({ message: 'User successfully deleted' });
        });
   });

   app.post('/api/authenticate', function(req, res) {
     var response;
     User.findOne({"username": new RegExp('^'+req.body.username+'$', "i")}, function(err, user) {
          if (err)
              res.send(err);
          if (user !== null && user.password === req.body.password) {
              response = { success: true };
          } else {
              response = { success: false, message: 'Username or password is incorrect' };
          }

          res.json(response);
      });
   });

   // frontend routes =========================================================
   // route to handle all angular requests
   app.get('*', function(req, res){
     res.sendfile('./public/index.html');
   });

 };
