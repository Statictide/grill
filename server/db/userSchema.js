var mongoose = require('mongoose');

var user = new mongoose.Schema({
          username: {type: String, required : true},
          stripe_customer_id: String,
});

module.exports = mongoose.model('user', user);