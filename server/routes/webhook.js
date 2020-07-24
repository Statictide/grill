var express = require('express');
var router = express.Router();

// Set your secret key. Remember to switch to your live secret key in production!
// See your keys here: https://dashboard.stripe.com/account/apikeys
const stripe = require('stripe')('sk_test_51H4hdCKXVCnO2pJVhwskX2q0fTD1PUvMHVkm62cC9PBfifyvqiYpLTSmVVjYkvo2G8z7MSskdE3agf7oRAh308yc00nsBZgXMJ');

// If you are testing your webhook locally with the Stripe CLI you
// can find the endpoint's secret by running `stripe listen`
// Otherwise, find your endpoint's secret in your webhook settings in the Developer Dashboard
//const endpointSecret = 'whsec_dARxlvwIIWkZsOZDN7w5zfgF3lCHujB4';
const endpointSecret = "whsec_sCFRdbZbg7kK79KOX8FhrgLO9wAI8K2l";

// Use body-parser to retrieve the raw body as a buffer
const bodyParser = require('body-parser');

// Match the raw body to content type application/json
router.post('/', bodyParser.raw({type: 'application/json'}), (req, res) => {
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
    console.log(`User: ${session.client_reference_id} has completed payment`);
  }
  

module.exports = router;
