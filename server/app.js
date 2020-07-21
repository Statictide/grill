var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var multer = require('multer');
var upload = multer();
var session = require('express-session');

var thingsRouter = require('./routes/things');
var authRouter = require('./routes/auth');
var idRouter = require('./routes/id');
//const { appendFile } = require('fs');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(upload.array());
app.use(session({
  secret: "Your secret key",
  resave: false,
  saveUninitialized: false
  //store: sessionStore, // connect-mongo session store
  }));

//Logging
app.use((req, res, next) => {
  var id = "undefined";
  if(req.session.user){
    id = req.session.user.id;
  }
  console.log(`${req.method} request to ${req.url} from ${id}`);
  next();
});

app.use('/', thingsRouter);
app.use("/", authRouter);
app.use('/id', idRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
