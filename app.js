const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const config = require('./config');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const listsRouter = require('./routes/lists');
const picturesRouter = require('./routes/pictures');
const authRouter = require('./routes/auth')

const mongoose = require('mongoose');
mongoose.Promise = Promise;
mongoose.connect(config.databaseUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/users/:userId/lists', listsRouter);
app.use('/users/:userId/pictures', picturesRouter);
app.use('/login', authRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.use('/', function(err, req, res, next) {

  // Log the error on stderr
  console.warn(err);

  // Respond with 422 Unprocessable Entity if it's a Mongoose validation error
  if (err.name == 'ValidationError' && !err.status) {
    err.status = 422;
  }

  // Set the response status code
  res.status(err.status || 500);

  // Send the error message in the response
  const response = {
    message: err.message
  };

  // If it's a validation error, also send the errors details from Mongoose
  // if (err.status == 422) {
  //   response.errors = err.errors;
  // }

  // Send the error response
  res.send(response);
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
