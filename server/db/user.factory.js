//https://stackoverflow.com/questions/40548559/connecting-to-mongodb-using-mongoose-in-multiple-files
var mongoose = require('mongoose');
var User = require('./userSchema.js');
var Grill = require('./grillSchema.js');

//Bind connection to error event (to get notification of connection errors)
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {console.log("we're connected!")});


exports.getUsers = getUsers;
exports.getUser = getUser;
exports.postUser = postUser;
exports.getGrill = getGrill;

function getUsers() {
    return new Promise((resolve, reject) => {
        var query = User.find({});
        query.exec().then(resolve, reject);
    });
}

function getUser(req) {
    return new Promise((resolve, reject) => {
        var query = User.findOne(req.body);
        query.exec().then(resolve, reject);
    });
}
  
  
  
function postUser(req) {
    return new Promise((resolve, reject) => {
        // Creates a new User based on the Mongoose schema and the post body
        var newUser = new User(req.body);

        // New User is saved in the db.
        newUser.save(err => {
            console.log('err', err);
            if (err) {
                return reject({err : 'Error while saving new user'});
            }
            // If no errors are found, it responds with a JSON of the new users
            return resolve(req.body);
        });
    });
}

function getGrill(name = "dania1") {
    return new Promise((resolve, reject) => {
        var query = Grill.findOne({name: name});
        query.exec().then(resolve, reject);
    });
}