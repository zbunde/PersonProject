var express = require('express');
var cookieSession = require('cookie-session');
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
var app = express();
var bookshelf = require('./models/user');
require('dotenv').load()
var passport = require('passport')
require('./config/passport')(passport);


app.set('bookshelf', bookshelf);


var usersAPI = require('./routes/api/v1/users')(passport);
var facebookAPI = require('./routes/api/v1/auth/facebook')(passport);
var surveysAPI = require('./routes/api/v1/surveys');
var surveyItemsAPI = require('./routes/api/v1/survey_items');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// TODO: Make this a better secret loaded from ENV variables
app.use(cookieParser('secret'));
app.use(cookieSession({ key: 'person.session', secret: 'secret'}));

// TODO: Make this session via ENV variables
//app.use(session({ secret: 'TODOsessionSecret' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/api/v1/users', usersAPI);
app.use('/api/v1/auth/facebook', facebookAPI);
app.use('/api/v1/surveys', surveysAPI);
app.use('/api/v1/survey-items', surveyItemsAPI);

app.use('/api/*', function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// send all routes to index.html and let angular handle the routing
app.use('*', function (req, res, next) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// catch 404 and forward to error handler
// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({error: {
      message: err.message,
      error: err
    }});
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({error: {
    message: err.message,
    error: {}
  }});
});

module.exports = app;
