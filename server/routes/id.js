var express = require('express');
const createHttpError = require('http-errors');
var router = express.Router();



router.get('/', async (req, res, next) => {
    if(!req.session.user) {
        return next(createHttpError(401, "Please log in first"));
    }

    // Set your secret key. Remember to switch to your live secret key in production!
    // See your keys here: https://dashboard.stripe.com/account/apikeys
    const stripe = require('stripe')('sk_test_51H4hdCKXVCnO2pJVhwskX2q0fTD1PUvMHVkm62cC9PBfifyvqiYpLTSmVVjYkvo2G8z7MSskdE3agf7oRAh308yc00nsBZgXMJ');

    const session = await stripe.checkout.sessions.create({
    client_reference_id: req.session.user.id,
    payment_method_types: ['card'],
    line_items: [{
        price_data: {
            currency: 'dkk',
            product_data: {
                name: 'Grill deposit',
            },
            unit_amount: 500,
        },
        quantity: 1,
    }],
    mode: 'payment',
    success_url:'http://localhost:3000/sucess',
    cancel_url: 'http://localhost:3000/',
    });


    res.json({session_id: session.id});
  });

module.exports = router;
