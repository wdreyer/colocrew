var express = require('express');
var cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();

var applicationsRouter = require('./routes/applications');
var campsRouter = require('./routes/camps');
var usersRouter = require('./routes/users');
var settingsRouter = require('./routes/settings');

require('./models/connection');

var app = express();
const fileUpload = require('express-fileupload');
app.use(fileUpload());

app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/applications', applicationsRouter);
app.use('/camps',campsRouter);
app.use('/users', usersRouter);
app.use('/settings', settingsRouter);

module.exports = app;
