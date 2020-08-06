var mongoose = require('mongoose');

var user = new mongoose.Schema({
          useername: {type: String, required : true}
});

module.exports = mongoose.model('user', user);