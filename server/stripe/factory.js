// Set your secret key. Remember to switch to your live secret key in production!
const stripe = require('stripe')('sk_test_51H4hdCKXVCnO2pJVhwskX2q0fTD1PUvMHVkm62cC9PBfifyvqiYpLTSmVVjYkvo2G8z7MSskdE3agf7oRAh308yc00nsBZgXMJ');
const DBFactory = require('../db/factory')

exports.getCheckoutSessionId = getCheckoutSessionId;
exports.createCustomer = createCustomer;

function createCheckoutSession(grillModel, userModel) {
    return new Promise((resolve, reject) => {
        stripe.checkout.sessions.create({
            client_reference_id: userModel._id.toString(),
            metadata: {user_id: userModel._id.toString(), grill_id: grillModel._id.toString()},
            customer: userModel.stripe_customer.toString(),
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
            success_url:'http://localhost:3000/',
            cancel_url: 'http://localhost:3000/',
        },
        function (err, session) {
            if (err) reject(err);
            resolve(session);
        })
    })
}

//Session.user
function getCheckoutSessionId(grill, user) {
    console.log("getCheckoutSessionId")
    return Promise.all([DBFactory.getGrill(grill), DBFactory.getUser(user)])
    .then(values => {
        grillModel = values[0]
        userModel = values[1]
        return createCheckoutSession(grillModel, userModel)
    })
    
}

// User = {username}
function createCustomer(username) {
    return new Promise((resolve, reject) => {
        stripe.customers.create(
            {
                description: username,
                metadata: {username: username},
            },
            function(err, customer) {
                if (err) {
                    return reject(err);
                }
                return resolve(customer);
            }
        );
    });
}