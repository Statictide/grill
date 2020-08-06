var express = require('express');
var router = express.Router();
var UserFactory = require('./../db/user.factory');

router.get('/', (req, res) => {
    res.render('index', {user: req.session.user});
});


router.get('/sucess', (req, res) => {
    res.render('sucess', {user: req.session.user});
});

router.get("/grill", (req, res) => {
    UserFactory.getGrill("dania1").then(grill => {
        res.json(grill);
    }, err => {
        console.log(err)
    });
});


module.exports = router;
