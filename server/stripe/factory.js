// Set your secret key. Remember to switch to your live secret key in production!
const stripe = require('stripe')('sk_test_51H4hdCKXVCnO2pJVhwskX2q0fTD1PUvMHVkm62cC9PBfifyvqiYpLTSmVVjYkvo2G8z7MSskdE3agf7oRAh308yc00nsBZgXMJ');

exports.getCheckoutSessionId = getCheckoutSessionId;
exports.createCustomer = createCustomer;

function createCheckoutSession(user, grill) {
    return new Promise((resolve, reject) => {
        stripe.checkout.sessions.create({
            client_reference_id: user._id,
            metadata: {user_id: user._id, grill_id: grill._id},
            customer: user.stripe_customer,
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
        });
    });
}

//Session.user
function getCheckoutSessionId(user, grill) {
    return createCheckoutSession(user, grill)
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