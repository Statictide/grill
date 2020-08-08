var express = require('express');
var router = express.Router();
var UserFactory = require('./../stripe/factory');
const { HttpError } = require('http-errors');


router.get('/', async (req, res, next) => {
    if(!req.session.user) {
        return next(createHttpError(401, "Please log in first"));
    }

    UserFactory.getGrillCheckoutSessionId(req.session.user).then(
        session => res.json({session_id: session.id}),
        err => next(HttpError(503, "Stripe failed, try again later"))
    );
});

module.exports = router;
