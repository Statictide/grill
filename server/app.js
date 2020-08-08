var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser')
var multer = require('multer');
var upload = multer();
var session = require('express-session');
const stripe = require('stripe')('sk_test_51H4hdCKXVCnO2pJVhwskX2q0fTD1PUvMHVkm62cC9PBfifyvqiYpLTSmVVjYkvo2G8z7MSskdE3agf7oRAh308yc00nsBZgXMJ');
var mongoose = require('mongoose');

//Set up default mongoose connection
const uri = "mongodb+srv://user_0:123@cluster0.isosq.mongodb.net/Cluster0?retryWrites=true&w=majority";
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});

//Routes
var thingsRouter = require('./routes/things');
var authRouter = require('./routes/auth');
var idRouter = require('./routes/id');
var webhookRouter = require('./routes/webhook');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


app.use(bodyParser.urlencoded({ extended: false }));
//  app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(upload.array());
app.use(session({
  secret: "Your secret key",
  resave: false,
  saveUninitialized: false
  //store: sessionStore, // connect-mongo session store
}));

// Logging 
app.use((req, res, next) => {
  console.log(`${req.method} request to ${req.url} from user ${JSON.stringify(req.session.user)}`);
  next();
});

//Webhook needs the raw body
app.use('/webhook', webhookRouter);
app.use(bodyParser.json());

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
