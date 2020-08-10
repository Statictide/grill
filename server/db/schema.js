var mongoose = require('mongoose')

var Grill = new mongoose.Schema({
    name: {type: String, required : true},
    renter: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
})

var User = new mongoose.Schema({
    username: {type: String, required : true},
    stripe_customer: String,
})

module.exports = {
    Grill: mongoose.model('Grill', Grill),
    User: mongoose.model('User', User)
}