var express = require('express');
var router = express.Router();
var UserFactory = require('./../stripe/factory');
var HttpError = require('http-errors');


router.get('/id', async (req, res, next) => {
    if(!req.session.user) {
        return next(HttpError(401, "Please log in first"));
    }

    UserFactory.getGrillCheckoutSessionId({name: "dania1"}, req.session.user).then(
        session => res.json({session_id: session.id}),
        err => next(HttpError(503, "Stripe failed, try again later" + err.message))
    );
});

module.exports = router;
