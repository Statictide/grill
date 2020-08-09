var express = require('express');
var router = express.Router();
var DBFactory = require('../db/factory');
var StripeFactory = require('../stripe/factory');
const { HttpError } = require('http-errors');

router.get('/', (req, res) => {
    res.render('index', {user: req.session.user});
});


router.get('/success', (req, res) => {
    res.render('sucess', {user: req.session.user});
});

router.get("/grills", (req, res) => {
    DBFactory.getGrill("dania1").then(grill => {
        res.json(grill);
    }, err => {
        console.log(err)
    });
});



module.exports = router;
