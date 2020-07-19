var express = require('express');
var router = express.Router();



router.get('/', async (req, res) => {
    // Set your secret key. Remember to switch to your live secret key in production!
    // See your keys here: https://dashboard.stripe.com/account/apikeys
    const stripe = require('stripe')('sk_test_51H4hdCKXVCnO2pJVhwskX2q0fTD1PUvMHVkm62cC9PBfifyvqiYpLTSmVVjYkvo2G8z7MSskdE3agf7oRAh308yc00nsBZgXMJ');

    const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],//, 'ideal'],
    line_items: [{
        price_data: {
        currency: 'eur',
        product_data: {
            name: 'T-shirt',
        },
        unit_amount: 2000,
        },
        quantity: 1,
    }],
    mode: 'payment',
    success_url:'http://localhost:3000/sucess',
    cancel_url: 'https://example.com/cancel',
    });


    res.json({session_id: session.id});
  });

module.exports = router;
