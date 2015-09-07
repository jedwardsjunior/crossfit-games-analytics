var mongoose       = require('mongoose');
var Schema         = mongoose.Schema;
var bcrypt         = require('bcrypt-nodejs');


// define model =================

var userSchema = new Schema(
  {
    "username": { type: String, required: true, unique: true },
    "firstName":{ type: String, required: true },
    "lastName": { type: String, required: true },
    "password": { type: String, required: true},
    "fran": String,
    "grace": String,
    "helen": String,
    "filthy50": String,
    "fightGoneBad": String,
    "sprint400m": String,
    "run5k": String,
    "cleanAndJerk": String,
    "snatch": String,
    "deadlift": String,
    "backSquat": String,
    "pullups": String,
    "image": { data: Buffer, contentType: String },
    "resetPasswordToken": String,
    "resetPasswordExpires": Date
  },
  {collection: "users"}
);

userSchema.pre('save', function(next) {
  var user = this;
  var SALT_FACTOR = 5;

  if (!user.isModified('password')) return next();

  bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

module.exports = mongoose.model('User', userSchema);
