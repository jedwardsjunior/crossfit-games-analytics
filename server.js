// modules =================================================
var express        = require('express');
var app            = express();
var mongoose       = require('mongoose');
var bodyParser     = require('body-parser');
var cookieParser   = require('cookie-parser');
var methodOverride = require('method-override');
var request        = require("request");
var session        = require('express-session')
var nodemailer     = require('nodemailer');
var passport       = require('passport');
var LocalStrategy  = require('passport-local').Strategy;
var bcrypt         = require('bcrypt-nodejs');
var async          = require('async');
var crypto         = require('crypto');
var User           = require('./app/models/userModel');

require('./app/passport')(app); // configure passport for authorization

// configuration ===========================================
var port = process.env.PORT || 8080; // set our port

var db = require('./config/db');
mongoose.connect(db.url); // connect to our mongoDB database

// setup middleware
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
app.use(cookieParser());

app.use(session({ secret: 'session secret key' }));
app.use(passport.initialize());
app.use(passport.session());

app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users

// routes ==================================================
require('./app/routes')(app); // configure our routes


// start app ===============================================
app.listen(port);// startup our app at http://localhost:8080

exports = module.exports = app; // expose app
