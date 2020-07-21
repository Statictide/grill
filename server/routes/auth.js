var express = require('express');
var router = express.Router();

var Users = [];

// Login
router.get("/login", (req, res) => {
  res.render("login", {user: req.session.user});
});

router.post('/login', (req, res) => {
    if(!req.body.id){
        res.render("login", {message: "Please enter your id", user: req.session.user})
    }
    // Look for existing user, login if match found
    Users.filter((user) => {
        if(user.id == req.body.id){
            req.session.user = user;
            res.redirect("/");        
        }
    });

    // Create user
    var newUser = {id: req.body.id};
    Users.push(newUser);
    req.session.user = newUser;
    res.redirect('/');
});

router.get('/logout', (req, res) => {
  req.session.destroy()
  res.redirect('/');
});

router.get("/users", (req, res) => {
    res.json(Users);
})

module.exports = router;
