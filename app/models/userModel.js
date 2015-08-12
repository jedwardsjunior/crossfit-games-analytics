var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// define model =================

var userSchema = new Schema(
  {
    "firstName": String,
    "lastName": String,
    "username": String,
    "password": String,
  },
  {collection: "users"}
);

module.exports = mongoose.model('User', userSchema);
