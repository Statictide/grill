//https://stackoverflow.com/questions/40548559/connecting-to-mongodb-using-mongoose-in-multiple-files
var mongoose = require('mongoose');
var User = require('./userSchema.js');

//Set up default mongoose connection
const uri = "mongodb+srv://user_0:123@cluster0.isosq.mongodb.net/Cluster0?retryWrites=true&w=majority";
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {console.log("MongoDB connected!")});

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