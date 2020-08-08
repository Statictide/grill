var express = require('express');
var router = express.Router();
var DBFactory = require('../db/factory');
var StripeFactory = require('../stripe/factory');
const { HttpError } = require('http-errors');

router.get('/', (req, res) => {
    res.render('index', {user: req.session.user});
});


router.get('/sucess', (req, res) => {
    res.render('sucess', {user: req.session.user});
});

router.get("/grill", (req, res) => {
    DBFactory.getGrill("dania1").then(grill => {
        res.json(grill);
    }, err => {
        console.log(err)
    });
});

router.get("/rent", async (req, res, next) => {
    if (!req.session.user) {
        return res.send("Please log in");
    } 

    

    console.log("Success!");
    res.redirect("/")
})

router.get("/test", (req, res) => {
    if(!req.session.user) {
        return res.send("Please log in");
    }

    StripeFactory.createCustomer(req.session.user).then(
        customer => {
            req.session.user.stripeCustomerId = customer.id
            res.json(customer);
        },
        err => next(HttpError(503), err.message)
    )
})


module.exports = router;
