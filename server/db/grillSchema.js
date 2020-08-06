var mongoose = require('mongoose');

var Grill = new mongoose.Schema({
          name: {type: String, required : true},
          lenter: {type: mongoose.Schema.Types.ObjectId, ref: 'Grill'}
});

module.exports = mongoose.model('Grill', Grill);