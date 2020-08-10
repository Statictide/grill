var express = require('express');
var router = express.Router();
var DBUserFactory = require('../db/user.factory');
var DBGrillFactory = require('../db/grill.factory');
var StripeFactory = require('../stripe/factory');
var HttpError = require('http-errors');

router.get('/', (req, res) => {
    res.render('index', {user: req.session.user});
});


router.get('/success', (req, res) => {
    res.render('sucess', {user: req.session.user});
});

router.get("/grills", (req, res) => {
    DBGrillFactory.getGrill("dania1")
    .then(grill => res.json(grill))
    .catch(err => console.log(err));
});

router.get('/clear', (req, res, next) => {
    DBGrillFactory.clearGrillRenter({name: "dania1"})
    .then(res.send("Sucessfully cleared"))
    .catch(err => next(HttpError(500, err.message)))
})


module.exports = router;