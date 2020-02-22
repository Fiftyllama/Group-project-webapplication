const express = require('express');
const router = express.Router();
const path = require('path');
const mongoose = require('mongoose');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const config = require('../config/database');
const passport = require('passport');

mongoose.connect(config.database);
let db = mongoose.connection;

// Check for DB errors
db.on('error', function(err){
  console.log(err);
});

// Making sure db working
db.once('open', function() {
  console.log('Connected to MongoDB');
});

// Express Session Middleware
router.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));

// Express Messages Middleware
router.use(require('connect-flash')());
router.use(function(req, res, next) {
  res.locals.messages = require("express-message")(req, res);
  next();
});

// Express Validator Middleware
router.use(expressValidator({
  errorFormatter: function(param, msg, value) {
    var namespace = param.split('.')
    , root = namespace.shift()
    , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg : msg,
      value : value
    };
  }
}));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'E-commerce' });
});

module.exports = router;
