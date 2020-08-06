var express = require('express');
var router = express.Router();
var UserFactory = require('./../db/user.factory');

// Login
router.get("/login", (req, res) => {
  res.render("login", {title: "Login", user: req.session.user});
});

router.post('/login', (req, res) => {
    if(!req.body.username) {
        return res.render("login", {
            message: "Please enter your username", 
            user: req.session.user})
    }
    
    UserFactory.getUser(req).then(
        user => {
            // In no user exists, create it.
            if (!user) { UserFactory.postUser(req) }

            req.session.user = {username: req.body.username};
            return res.redirect("/"); 
        }, 
        err => console.log(err)
    );
});

router.get('/logout', (req, res) => {
    req.session.destroy()
    res.redirect('/');
});

router.get("/users", (req, res) => {
    UserFactory.getUsers().then(users => {
        res.json(users);

    }, err => console.log(err) );
})

module.exports = router;
