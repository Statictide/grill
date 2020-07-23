var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser')
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

// Logging 
app.use((req, res, next) => {
  console.log(`${req.method} request to ${req.url}`);
  next();
});

app.use('/', thingsRouter);
app.use("/", authRouter);
app.use('/id', idRouter);

const endpointSecret = "whsec_dARxlvwIIWkZsOZDN7w5zfgF3lCHujB4";

// Match the raw body to content type application/json
app.post('/webhook', bodyParser.raw({type: 'application/json'}), (req, res) => {
  console.log("1");
  const sig = request.headers['stripe-signature'];
  console.log("2");

  let event;

  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
  } catch (err) {
    console.log("Failed to build event");
    return response.status(400).send(`Webhook Error: ${err.message}`);
  }

  console.log("3");


  // Handle the checkout.session.completed event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    // Fulfill the purchase...
    handleCheckoutSession(session);
  }

  // Return a response to acknowledge receipt of the event
  response.json({received: true});
});

function handleCheckoutSession(session){
  console.log(session);
}











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
