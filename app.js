var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//Datenbankschema fuer Mongodb
const schraube = require('./models/schraube');

//einbinden der Routermodule
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//setzen der Route
 app.use('/', indexRouter);
 app.use('/users', usersRouter);


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

//Mongo

const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config(); // Lädt die Umgebungsvariablen aus der .env-Datei

mongoose.set("strictQuery", false);

const mongoDB = process.env.MONGODB_URI; // Verwendet die Umgebungsvariable

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(mongoDB);
}



module.exports = app;
