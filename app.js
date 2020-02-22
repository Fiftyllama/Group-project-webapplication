var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var dbPath = path.resolve(__dirname,'test.db');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(dbPath);

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
db.get("PRAGMA foreign_keys = ON")
db.serialize(function(){
	db.run("CREATE TABLE IF NOT EXISTS User('Usrkey' INTEGER PRIMARY KEY AUTOINCREMENT,'Usrname' TEXT NOT NULL UNIQUE,'Pwd' TEXT NOT NULL,'cookie' TEXT, 'Address' TEXT NOT NULL, 'PhoneNumber' TEXT, 'Firstname' TEXT NOT NULL, 'LastName' TEXT NOT NULL, 'Email' TEXT NOT NULL)");
	db.run("CREATE TABLE IF NOT EXISTS cart('Cartkey' INTEGER PRIMARY KEY AUTOINCREMENT,'productid' INTEGER NOT NULL, 'Amount' INTEGER NOT NULL, 'CartOwnerID' INTEGER, FOREIGN KEY (CartOwnerID) REFERENCES user(Usrkey))");
	db.run("CREATE TABLE IF NOT EXISTS products('productid' INTEGER PRIMARY KEY AUTOINCREMENT, 'ProductName' TEXT NOT NULL, 'ImgLink' ,'ProductDescripion' TEXT, 'ProductCost' INTEGER NOT NULL)");
});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
//app.use('/cart' cartRouter)
//app.use('/search' seachRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
