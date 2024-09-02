const mongoose = require('mongoose');

//Define the MongoDB Connection URL
const mongoURL = 'mongodb://localhost:27017/hotel' //Replace 'mydatabase' with your database name

//Set up MongoDb Connection
mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

//Get the default connection
//Mongoose maintains a default connection object representing the MongoDb Connection
const db = mongoose.connection;


// /Define event listners for db connections

db.on('connected', ()=> {
    console.log('Connected to MongoDB Server');
})

db.on('error', (err)=> {
    console.log('error', err);
})

db.on('disconnected', ()=> {
    console.log('MongoDB disconnected');
})

//Export the database connection
module.exports = db;

//db file change for example