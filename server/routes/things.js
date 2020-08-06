var express = require('express');
var router = express.Router();
var UserFactory = require('./../db/user.factory');
const createHttpError = require('http-errors');

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

router.get("/rent", async (req, res, next) => {
    if (!req.session.user) {
        return res.send("Please log in");
    } 

    var user, grill;
    var grillPromise = UserFactory.getGrill();
    var userPromise = UserFactory.getUser(req.session.user)

    grillPromise.then(
        g => grill = g, 
        err => next(err)
    );
    userPromise.then(
        u => user = u,
        err => next(err)
    )

    await grillPromise;
    await userPromise;

    grill.renter = user;
    grill.save();

    console.log("Success!");
    res.redirect("/")
})


module.exports = router;
