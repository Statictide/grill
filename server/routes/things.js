var express = require('express');
var router = express.Router();
var DBFactory = require('../db/factory');
var StripeFactory = require('../stripe/factory');
var HttpError = require('http-errors');

router.get('/', (req, res) => {
    var user = req.session.user

    if (!user) {
        return res.render('index');
    }


    //Check wich grills are rented by user
    DBFactory.getRentedGrills(user)
    .then(grills => {
        obj = {
            user: user,
            rented_grills: grills,
        }

        return res.render('index', obj)
    })
});

router.get("/grills/:name", (req, res, next) => {
    grill = {name: req.params.name}
    DBFactory.getGrill(grill)
    .then(grill => res.json(grill))
    .catch(err => next(HttpError(500, err.message)))
})

//TODO: only do this if session.user matches
router.put("/grills/:name", (req, res, next) => {
    grill = {name: req.params.name}
    console.log(grill)
    if (req.body.open) {
        console.log("Opening box!")
    }

    if (req.body.release) {
        DBFactory.clearGrillRenter(grill)
        .then(() => console.log(`Cleared ${JSON.stringify(grill)}`))
        .then(() => res.send("Sucessfully cleared"))
        .catch(err => next(HttpError(500, err.message)))
    }
})



router.get('/clear', (req, res, next) => {
    DBFactory.clearGrillRenter({name: "dania1"})
    .then(res.send("Sucessfully cleared"))
})


module.exports = router;