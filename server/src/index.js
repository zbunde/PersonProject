import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
require('dotenv').load()

const app = express();
const port = process.env.PORT || 3000;
const debug = require('debug')('princeton-survey-app:server');

app.use(express.static(__dirname + '/../../public'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const server = app.listen(port, () => {
  debug(`Listening on Port ${port}`)
});

module.exports = app;
