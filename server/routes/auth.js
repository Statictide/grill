var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

//Set up default mongoose connection
const uri = "mongodb+srv://user_0:123@cluster0.isosq.mongodb.net/Cluster0?retryWrites=true&w=majority";
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});

//Bind connection to error event (to get notification of connection errors)
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => { console.log("we're connected!") });

// Login
router.get("/login", (req, res) => {
  res.render("login", {title: "Login", user: req.session.user});
});

const userScheme = new mongoose.Schema({
    id: String
});
const User = mongoose.model('User', userScheme);

router.post('/login', (req, res) => {
    if(!req.body.id) {
        return res.render("login", {
            message: "Please enter your id", 
            user: req.session.user})
    }

    //Find existing user
    User.findOne({id: req.body.id}, (err, user) => {
        console.log(`err: ${err}, user:${user}`);
        if (err) console.log(`${req.body.id} not found`);
        if (user) {
            //User found
            req.session.user = {id: user.id};
            return res.redirect("/"); 
        } else {
            // Create new user
            var newUser = new User({id: req.body.id});
            newUser.save()
            req.session.user = {id: newUser.id};
            return res.redirect('/');
        }
    });    
});

router.get('/logout', (req, res) => {
  req.session.destroy()
  res.redirect('/');
});

router.get("/users", (req, res) => {
    res.json(Users);
})

module.exports = router;
