//https://stackoverflow.com/questions/40548559/connecting-to-mongodb-using-mongoose-in-multiple-files
var mongoose = require('mongoose');
var User = require('./userSchema.js');
var Grill = require('./grillSchema.js');

//Bind connection to error event (to get notification of connection errors)
//Set up default mongoose connection
const uri = "mongodb+srv://user_0:123@cluster0.isosq.mongodb.net/Cluster0?retryWrites=true&w=majority";
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {console.log("MongoDB connected!")});

exports.getUsers = getUsers;
exports.getUser = getUser;
exports.postUser = postUser;
exports.updateGrillRenter = updateGrillRenter;
exports.getGrill = getGrill;

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

async function updateGrillRenter(user) {
    var user, grill;
    var grillPromise = DBFactory.getGrill();
    var userPromise = DBFactory.getUser(user)

    grillPromise.then(
        g => grill = g, 
        err => next(err)
    );
    userPromise.then(
        u => user = u,
        err => next(err)
    )

    await grillPromise;
    await userPromise;

    grill.renter = user;
    grill.save();
}

function getGrill(name = "dania1") {
    var promise = Grill.findOne({name: name}).exec();
    return promise;
}