var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var cookieSession = require('cookie-session');
var cookieParser = require('cookie-parser');
var passport = require('passport')

require('dotenv').load()
require('./config/passport')(passport);

var app = express();
var port = process.env.PORT || 3000;
var debug = require('debug')('princeton-survey-app:server');

app.use(express.static(__dirname + '/../public'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser('secret'));
app.use(cookieSession({ key: 'person.session', secret: 'secret'}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/v1/users', require('./routes/api/v1/users')(passport));
app.use('/api/v1/surveys', require('./routes/api/v1/surveys'));
app.use('/api/v1/survey-items', require('./routes/api/v1/survey_items'));

var server = app.listen(port, function(){
  debug('Listening on Port:', port)
});

module.exports = app;
