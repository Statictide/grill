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
        console.log(`Cleared renter of${JSON.stringify(grill)}`)
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

//Only finds one grill currently
function getRentedGrills(user) {
    return Promise.all([getUser(user), getGrill({})])
    .then(values => {
        var user = values[0]
        var grill = values[1]

        var grills = []
        if (user._id.equals(grill.renter)) {
            grills.push(grill)
        }

        return grills
    })
}

function getGrill(grill) {
    return Grill.findOne(grill).exec()
    .then(grillModel => {
        //Throw error none found
        if (!grillModel) {
            throw new Error(`getGrill: No grill found matching ${JSON.stringify(grill)}`)
        }
         
        return grillModel
    })
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