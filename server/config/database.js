//Import the mongoose module
const mongoose = require('mongoose');

//Set up default mongoose connection
let mongoDB;
if (process.env.NODE_ENV === undefined || process.env.NODE_ENV === 'dev') {
    mongoDB = 'mongodb://127.0.0.1/image-gallery';
}else {
    mongoDB = 'mongodb://127.0.0.1/image-gallery';
}

mongoose.connect(mongoDB, { useNewUrlParser: true } ,function (err, res) {
    if (err) {
        console.log ('ERROR connecting to: ' + mongoDB + ' => ' + err);
    } else {
        console.log ('Succeeded connected to: ' + mongoDB);
    }
});

// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
const db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = db;