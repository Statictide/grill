var express = require('express');
var router = express.Router();
var DBUserFactory = require('../db/user.factory');
var StripeFactory = require('../stripe/factory');
var HttpError = require('http-errors');

// Login
router.get("/login", (req, res) => {
  res.render("login", {title: "Login", user: req.session.user});
});

//Req body should contain username
router.post('/login', (req, res, next) => {
    // username must be set
    if(!req.body.username) {
        return res.render("login", {
            message: "Please enter your username", 
            user: req.session.user})
    }
    
    DBUserFactory.getUser(req)
    // If user is found, pass it on. Otherwise create user first
    .then(userModel => {
        if (userModel) 
            return userModel;
        else 
            return createUser(req)
    })
    .then(user => {
        req.session.user = {username: user.username, stripe_customer: user.stripe_customer};
        return res.redirect("/"); 
    })
    .catch(err => {
        next(HttpError(500, err.message));
    });
});

// Requires req.body.username
function createUser(req) {
    // Create stripe customer
    return StripeFactory.createCustomer(req.body.username)
    .then(customer => {
        return {
            username: req.body.username, 
            stripe_customer: customer.id
        };
    })
    // Post user to database
    .then(user => DBUserFactory.postUser(user)) //This promise is dynamically inserted into the chain
}

router.get('/logout', (req, res) => {
    req.session.destroy()
    res.redirect('/');
});

router.get("/users", (req, res, next) => {
    DBUserFactory.getUsers().then(
        users => res.json(users), 
        err => next(HttpError(500, err.message))
    );
})

module.exports = router;
