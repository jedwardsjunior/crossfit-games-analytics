var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// define model =================

var athleteSchema = new Schema(
  {
    "Fran": String,
    "Helen": String,
    "Grace": String,
    "Filthy 50": String,
    "Fight Gone Bad": String,
    "Sprint 400m": String,
    "Run 5k": String,
    "Clean & Jerk": String,
    "Snatch": String,
    "Deadlift": String,
    "Back Squat": String,
    "Max Pull-ups": String
  }
);

module.exports = athleteSchema;
