var mongoose = require('mongoose')

var Grill = new mongoose.Schema({
    name: {type: String, required : true},
})

var User = new mongoose.Schema({
    username: {type: String, required : true},
    stripe_customer: String,
    rented_grill: {type: mongoose.Schema.Types.ObjectId, ref: 'Grill'},
})

module.exports = {
    Grill: mongoose.model('Grill', Grill),
    User: mongoose.model('User', User)
}