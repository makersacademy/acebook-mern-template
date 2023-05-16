const User = require("../models/user");

const UsersController = {
  Create: async (req, res) => {  //defines a method called "Create" that is an asynchronous function and takes two parameters: "req" and "res", which represent the request and response objects.
    const {email} = req.body; // extracts the email property from the request body
    const existingUser = await User.findOne({ email }); //queries the database to see if a user with the provided email already exists.
                                                        // It uses the User model to find a document in the database that matches the provided email.
    
    if (existingUser) {
      return res.status(409).json({ message: 'Email address already in use' });
    }  //condition checks if the user with the provided email already exists. If it does, it returns a response with a 409 status code and a message indicating that the email address is already in use.
    
    const user = new User(req.body); // creates a new instance of the user model and with the request body as data
    user.save((err) => {             // saves the user
      if (err) {
        return res.status(400).json({ message: 'Bad request' });  // if there was an error whilst saving, it will return a 400 status with the message 'Bad request'
      } else {
        return res.status(201).json({ message: 'OK' }); // else if the save is successfull, it will return a 201 status and an 'OK' message
      }
    });
  },
};


module.exports = UsersController;


//findOne() and save() methods used in the code are asynchronous operations that involve interacting with a database, which may take some time to complete. 
//findOne() and save() are both asynchronous operations that return Promises in Mongoose. 
// When using asynchronous operations, it's best to use async/await or .then() to handle the Promises and ensure that the code executes in the correct order and ensures the application remains responsive and performs efficiently.
// on its own the save() method takes a callback function that will be executed once the operation is completed.  




// const { email } = req.body; is using object destructuring to extract the email property from the req.body object. 
//This means that it's equivalent to writing const email = req.body.email;, but in a shorter and more concise way.

//On the other hand, const user = new User(req.body); is creating a new instance of the User model and passing the entire req.body object as an argument

