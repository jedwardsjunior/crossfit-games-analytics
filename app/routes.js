// app/routes.js
var mongoose = require('mongoose')
var athleteSchema = require('./models/athleteScores');

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
         "filthy50": scores[0].filthy50,
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

   // route to handle creating (app.post)
   // route to handle delete (app.delete)

   // frontend routes =========================================================
   // route to handle all angular requests
   app.get('*', function(req, res){
     res.sendfile('./public/index.html');
   });

 };
