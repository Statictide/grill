var express = require('express');
var router = express.Router();
var DBFactory = require('../db/factory');
var StripeFactory = require('../stripe/factory');
var HttpError = require('http-errors');

router.get('/', (req, res, next) => {
    var user = req.session.user

    if (!user) {
        return res.render('index');
    }


    //Check wich grills are rented by user
    DBFactory.getRentedGrill(user)
    .then(grillModel => {
        obj = {user: user, rented_grill: grillModel}
        return res.render('index', obj)
    })
    .catch(err => next(HttpError(500, err.message)))

});

router.get('/grills', (req, res, next) => {
    DBFactory.getGrills({})
    .then(grill => res.json(grill))
    .catch(err => next(HttpError(500, err.message)))
})

router.get("/grills/:name", (req, res, next) => {
    grill = {name: req.params.name}
    DBFactory.getGrill(grill)
    .then(grill => res.json(grill))
    .catch(err => next(HttpError(500, err.message)))
})

//TODO: only do this if session.user matches
router.put("/grills/:_id", (req, res, next) => {
    var user = req.session.user
    var grill = {_id: req.params._id}

    //Check authentication
    DBFactory.getUser(user)
    .then(userModel => {
        if (!userModel.rented_grill.equals(grill._id)) {
            throw new Error("Unauthorized")
        }
    })
    .then(() => {
        if (req.body.open) {
            //Do stuff
        }
    
        if (req.body.release) {
            return DBFactory.clearRental(grill, user)
        }
    })
    .then(() => res.sendStatus(200)) //OK
    .catch(err => next(HttpError(500, err.message)))
})


module.exports = router;