//https://stackoverflow.com/questions/40548559/connecting-to-mongodb-using-mongoose-in-multiple-files
var mongoose = require('mongoose')
var DBUserFactory = require('./user.factory')
var Grill = require('./grillSchema.js')

exports.updateGrillRenter = updateGrillRenter;
exports.getGrill = getGrill;

//grill.name, user.username should both exist
async function updateGrillRenter(grill, user) {
    return Promise.all([
        //Get grill and user
        getGrill(grill),
        DBUserFactory.getUser(user)])
    .then(values => {
        //Then update database with new renter
        grillModel = values[0]
        userModel = values[1]

        grillModel.renter = userModel
        grillModel.save()
    })
}


function getGrill(name = "dania1") {
    var promise = Grill.findOne({name: name}).exec();
    return promise;
}