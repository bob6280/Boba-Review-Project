var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const passport = require('passport');
const cookieSession = require('cookie-session');
require('./passport');

var app = express();

app.use(cookieSession({
  name: 'google-auth-session',
  keys: ['key1', 'key2']
}))

app.use(passport.initialize());
app.use(passport.session());

app.get("/failed", (req, res) => {
  res.redirect('/');
})

app.get('/google',
    passport.authenticate('google', {
          scope:
              ['email', 'profile']
        }
    ));

app.get('/google/callback',
    passport.authenticate('google', {
      failureRedirect: '/failed',
    }),
    function (req, res) {
      res.redirect('/')
    }
);

app.get("/logout", (req, res) => {
  req.session = null;
  req.logout();
  res.cookie('current_user_info', {}, { maxAge: 900000, httpOnly: false});
  res.redirect('/');
})

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');



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

//Import the mongoose module
var mongoose = require('mongoose');

var mongoDB = 'mongodb+srv://zhufqiu:iw7xlbpB4NMluzki@cluster0.kkb83pj.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = app;
