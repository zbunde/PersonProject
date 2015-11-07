var express = require('express');
var cookieSession = require('cookie-session')
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var pg = require('pg');
var _ = require('lodash');
var session = require('express-session');
var flash = require('connect-flash');
var Promise = require('bluebird');
app = express();
var bookshelf = require('./models/user')
require('dotenv').load()
var passport = require('passport')
app.set('bookshelf', bookshelf);


var usersAPI = require('./routes/api/v1/users');
var surveysAPI = require('./routes/api/v1/surveys');
var surveyItemsAPI = require('./routes/api/v1/survey_items');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser('secret'));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/api/v1/users', usersAPI);
app.use('/api/v1/surveys', surveysAPI);
app.use('/api/v1/survey-items', surveyItemsAPI);

// send all routes to index.html and let angular handle the routing
app.use('*', function (req, res, next) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
