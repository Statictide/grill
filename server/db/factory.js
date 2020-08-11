//https://stackoverflow.com/questions/40548559/connecting-to-mongodb-using-mongoose-in-multiple-files
var mongoose = require('mongoose')
var {Grill, User} = require('./schema.js')

exports.clearRental = clearRental;
exports.updateGrillRenter = updateGrillRenter;
exports.getRentedGrill = getRentedGrill;
exports.getGrill = getGrill;
exports.getGrills = getGrills;
exports.getUser = getUser;
exports.getUsers = getUsers;
exports.postUser = postUser;

function clearRental(user) {
    return getUser(user)
    .then(userModel => {   
        userModel.rented_grill = null;
        userModel.save()
    })
}

//grill.name, user.username should both exist
function updateGrillRenter(grill, user) {
    //Get grill and user
    return Promise.all([getGrill(grill), getUser(user)])
    //Then update database with new renter
    .then(values => {
        grillModel = values[0]
        userModel = values[1]

        userModel.rented_grill = grillModel
        userModel.save()
    })
}

//Returns rented grill model, null otherwise
function getRentedGrill(user) {
    return getUser(user)
    .then(userModel => {
        if(!userModel.rented_grill) {
            return null
        }

        return getGrill(userModel.rented_grill)
    })
}

function getGrill(grill) {
    return Grill.findOne(grill).exec()
    .then(grillModel => {
        console.log(`${JSON.stringify(grillModel)}`)
        return grillModel
    })
}

function getGrills(grill) {
    return Grill.find(grill).exec()
}

function getUsers() {
    return User.find({}).exec()
    .then(userModel => {
        //Throw error none found
        if (!userModel) {
            throw new Error("getUsers: None found")
        }
         
        return userModel
    })
}

function getUser(req) {
    return User.findOne(req.body).exec()
    .then(userModel => {
        //Throw error none found
        if (!userModel) 
            throw new Error("getUsers: None found")
        else 
            return userModel
    })
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