//https://stackoverflow.com/questions/40548559/connecting-to-mongodb-using-mongoose-in-multiple-files
var mongoose = require('mongoose');
var Grill = require('./grillSchema.js');

//Set up default mongoose connection
const uri = "mongodb+srv://user_0:123@cluster0.isosq.mongodb.net/Cluster0?retryWrites=true&w=majority";
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {console.log("MongoDB connected!")});

exports.updateGrillRenter = updateGrillRenter;
exports.getGrill = getGrill;

async function updateGrillRenter(user) {
    var user, grill;
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