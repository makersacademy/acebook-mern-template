var mongoose = require("mongoose");
const User = require('../models/user.js');
const seedUsers = require('./seeds/userSeeds.js')

beforeAll(function (done) {
  mongoose.connect("mongodb://0.0.0.0/acebook_test", { //Connects to the test database
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  var db = mongoose.connection;
  db.on("error", console.error.bind(console, "MongoDB connection error:")); //Listens for an error event and console logs to the console 
  db.on("open", function () { //When we are connected to the database
    done();
  });
});

const seedDB = async () => { // We are assigning a function to the variable seedDB which is asynchronous 
  await User.deleteMany({}); // It deletes the existing contents from the database (User is the schema for one user)
  await User.insertMany(seedUsers); // It seeds the seedUsers data (required at the top of this file) into the collection 
}

afterAll(function (done) {
  seedDB() // The seedDB function (defined above) is called
  .then(() => { // Then, after the function completes...
    mongoose.connection.close(true, function () { // The connection to the database is closed 
    done();
    });
  })
});