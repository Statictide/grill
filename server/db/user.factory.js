//https://stackoverflow.com/questions/40548559/connecting-to-mongodb-using-mongoose-in-multiple-files
var mongoose = require('mongoose');
var express = require('express');
var User = require('./userSchema.js');

//Bind connection to error event (to get notification of connection errors)
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {console.log("we're connected!")});


exports.getUsers = getUsers;
exports.getUser = getUser;
exports.postUser = postUser;

function getUsers() {
    return new Promise( function (resolve, reject) {
        var query = User.find({});
        query.exec(function(err, users) {
            if (err){
                return reject({err : 'Error while fetching users'});
            }
            // If no errors are found, it responds with a JSON of all users
            return resolve(users);
        });
    });
}

function getUser(req) {
    return new Promise( function (resolve, reject) {
        var query = User.findOne(req.body);
        query.exec(function(err, user) {
            if (err){
                return reject({err : 'Error while fetching users'});
            }
            // If no errors are found, it responds with a JSON of all users
            return resolve(user);
        });
    });
}
  
  
  
function postUser(req) {
    return new Promise( function (resolve, reject) {
        console.log("postUser()");
        // Creates a new User based on the Mongoose schema and the post body
        var newUser = new User(req.body);
        // New User is saved in the db.
        newUser.save(function(err) {
            console.log('err', err);
            if (err){
                return reject({err : 'Error while saving new user'});
            }
            // If no errors are found, it responds with a JSON of the new users
            return resolve(req.body);
        });
    });
}