var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
require('dotenv').load()

var app = express();
var port = process.env.PORT || 3000;
var debug = require('debug')('princeton-survey-app:server');

app.use(express.static(__dirname + '/../../public'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var server = app.listen(port, function(){
  debug('Listening on Port:', port)
});

module.exports = app;
