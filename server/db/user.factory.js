//https://stackoverflow.com/questions/40548559/connecting-to-mongodb-using-mongoose-in-multiple-files
var mongoose = require('mongoose');
var User = require('./userSchema.js');

exports.getUsers = getUsers;
exports.getUser = getUser;
exports.postUser = postUser;

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