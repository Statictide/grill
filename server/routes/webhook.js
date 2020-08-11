var express = require('express')
var DBGrillFactory = require('../db/factory')
var router = express.Router()

// Set your secret key. Remember to switch to your live secret key in production!
const stripe = require('stripe')('sk_test_51H4hdCKXVCnO2pJVhwskX2q0fTD1PUvMHVkm62cC9PBfifyvqiYpLTSmVVjYkvo2G8z7MSskdE3agf7oRAh308yc00nsBZgXMJ');
const endpointSecret = "whsec_sCFRdbZbg7kK79KOX8FhrgLO9wAI8K2l";

// Use body-parser to retrieve the raw body as a buffer
const bodyParser = require('body-parser');

// Match the raw body to content type application/json
router.post('/webhook', bodyParser.raw({type: 'application/json'}), (req, res) => {
    const sig = req.headers['stripe-signature'];
    
    let event;
    try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
        console.log("Failed to build event");
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }
  
    console.log(`Webhook: ${event.type}`)
  
    // Handle the checkout.session.completed event
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
    
        // Fulfill the purchase...
        handleCheckoutSession(session);
    }

    // Return a response to acknowledge receipt of the event
    res.json({received: true});
});

function handleCheckoutSession(session){
    grill = {_id: session.metadata.grill_id}
    user = {_id: session.metadata.user_id}
    
    //Post new renter to database
    DBGrillFactory.updateGrillRenter(grill, user)
    .then(() => console.log("Grill renter updated"))
    .catch(err => console.log("Failed to update grill renter " + err.message))

}
  

module.exports = router;
