var mongoose = require('mongoose');

var Grill = new mongoose.Schema({
          name: {type: String, required : true},
          renter: {type: mongoose.Schema.Types.ObjectId, ref: 'Grill'}
});

module.exports = mongoose.model('Grill', Grill);