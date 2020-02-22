const express = require('express');
const router = express.Router();
const path = require('path');
const bodyParser = require('body-parser')
const bcrypt = require('bcryptjs');
const expressValidator = require('express-validator');
const config = require('../config/database')
const passport = require('passport');
const flash = require('connect-flash');

// Using expressValidator
router.use(expressValidator());

// Bring the User model
let User = require('../models/user');

// Body Parser Middleware
// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
router.use(bodyParser.json())

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Encryption/Decryption Tools' });
});

// Register Form
router.post('/register', function(req, res, next) {
  console.log('IN process...');
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const password2 = req.body.password2;

  req.checkBody('username', 'Name is required').notEmpty();
  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('email', 'Email is not valid').isEmail();
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('password2', 'Password do not match').equals(req.body.password);

  let errors = req.validationErrors();

  if (errors) {
    console.log(errors);
  }else {
    let newUser = new User({
      username:username,
      email:email,
      password:password
    });

    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(newUser.password, salt, function(err, hash) {
        if(err){
          console.log(err);
        }
        newUser.password = hash;
        newUser.save(function(err){
          if(err){
            console.log(err);
            return;
          }else {
            console.log('You are now registered and can log in');
            res.redirect('/users/clarifySign');
          }
        });
      });
    });
  }
});

// Passport config
require('../config/passport')(passport);

// Passport Middleware
router.use(passport.initialize());
router.use(passport.session());

router.get('*', function(req, res, next) {
  res.locals.user =req.user || null;
  next();
});

// Login form
router.post('/login', function(req, res, next) {
  passport.authenticate('local', {
    successRedirect:'/users/view_message',
    failureRedirect:console.log('Failed to login'),
    failureFlash: true
  })(req, res, next);
});



router.get('/view_message', function(req, res, next) {
  res.render('view_message', {
    title: 'Messages'
  });
});

router.post('/view_message', function(req, res, next) {
  let user = {};
  user.message = req.body.message;
  user.from = req.body.id;

  let query = {};


});

router.get('/send_message', function(req, res, next) {
  res.render('send_message', {
    title: 'Send Message'
  });
});

router.get("/logout", function(req, res){
  req.logout();
  req.flash('success', 'You have logged out successfully');
  res.redirect('/');
});

router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Encryption/Decryption Tools' });
});

module.exports = router;
