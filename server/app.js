const createError = require('http-errors')
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const multer = require('multer')
const upload = multer()
const session = require('express-session')
const mongoose = require('mongoose')
const tmp = require('./mqtt/factory')


//Routes
const thingsRouter = require('./routes/things');
const authRouter = require('./routes/auth');
const idRouter = require('./routes/id');
const webhookRouter = require('./routes/webhook');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(upload.array());
app.use(session({ 
  secret: "Your secret key",
  resave: false,
  saveUninitialized: false
  //store: sessionStore, // connect-mongo session store
}));

//Set up default mongoose connection
const uri = "mongodb+srv://user_0:123@cluster0.isosq.mongodb.net/Cluster0?retryWrites=true&w=majority";
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {console.log("MongoDB connected!")});

// Logging 
app.use((req, res, next) => {
  console.log(`${req.method} request to ${req.url} from user ${JSON.stringify(req.session.user)}`);
  next();
});

//Webhook needs the raw body
app.use('/', webhookRouter);
app.use(bodyParser.json());

app.use('/', thingsRouter);
app.use("/", authRouter);
app.use('/', idRouter);





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

  console.log(err.message);
});

module.exports = app;