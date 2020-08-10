//https://stackoverflow.com/questions/40548559/connecting-to-mongodb-using-mongoose-in-multiple-files
var mongoose = require('mongoose')
var DBUserFactory = require('./user.factory')
var Grill = require('./grillSchema.js')

exports.clearGrillRenter = clearGrillRenter;
exports.updateGrillRenter = updateGrillRenter;
exports.getGrill = getGrill;

function clearGrillRenter(grill) {
    return getGrill(grill)
    .then(grillModel => {
        grillModel.renter = null;
        grillModel.save(err => console.log(err))
    })
}

//grill.name, user.username should both exist
function updateGrillRenter(grill, user) {
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

function getGrill(grill = {name: "dania1"}) {
    var promise = Grill.findOne(grill).exec()
    return promise;
}