
//Import the mongoose module
var mongoose = require('mongoose');

//Set up default mongoose connection
const uri = "mongodb+srv://user_0:123@cluster0.isosq.mongodb.net/Cluster0?retryWrites=true&w=majority";
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
    console.log("we're connected!")
});



const userScheme = new mongoose.Schema({
    name: String
});

// NOTE: methods must be added to the schema before compiling it with mongoose.model()
userScheme.methods.speak = function () {
    const greeting = this.name
      ? "Meow name is " + this.name
      : "I don't have a name";
    console.log(greeting);
}





const User = mongoose.model('User', userScheme);

const user = new User ({ name: 'John Doe' });
user.save().then(() => console.log('meow'));
user.speak();

User.findOne({name: "John Doe"}, (err, res) => {
    console.log(res);
});


