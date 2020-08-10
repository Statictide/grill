//https://stackoverflow.com/questions/40548559/connecting-to-mongodb-using-mongoose-in-multiple-files
var mongoose = require('mongoose')
var {Grill, User} = require('./schema.js')

exports.clearGrillRenter = clearGrillRenter;
exports.updateGrillRenter = updateGrillRenter;
exports.getRentedGrills = getRentedGrills;
exports.getGrill = getGrill;
exports.getUser = getUser;
exports.getUsers = getUsers;
exports.postUser = postUser;

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
        getUser(user)])
    .then(values => {
        //Then update database with new renter
        grillModel = values[0]
        userModel = values[1]

        grillModel.renter = userModel
        grillModel.save()
    })
}

//Only finds "dania1" currently
function getRentedGrills(user) {
    return Promise.all([getUser(user), getGrill({name: "dania1"})])
    .then(values => {
        var user = values[0]
        var grill = values[1]

        var grills = []
        if (grill.renter.equals(user._id)) {
            grills.push(grill)
        }

        return grills
    })
}

function getGrill(grill) {
    var promise = Grill.findOne(grill).exec()
    return promise;
}

function getUsers() {
    var promise = User.find({}).exec();
    return promise;
}

function getUser(req) {
    var promise = User.findOne(req.body).exec();
    return promise;
}

function postUser(user) {
    return new Promise((resolve, reject) => {
        var newUser = new User(user);

        newUser.save(err => {
            if (err) {
                console.log("Error in posting user to database. db.factory.js")
                reject(err);
            } else {
                return resolve(newUser);
            }
        });
    });
}