//import necessary modules and files
const app = require("../../app");
const request = require("supertest");
const bcrypt = require('bcrypt'); //import bcrypt module here
require("../mongodb_helper");
const User = require('../../models/user');
const UsersController = require("../../controllers/users");

describe('UsersController', () => {
  it('should save a user with a hashed password', async () => {
    //mock request object
    const req = {
      body: {
        email: "test@example.com",
        password: "plaintextpassword",
      },
    };
    //mock response object
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    await UsersController.Create(req, res);
    //fetch the user from the database
    const user = await User.findOne({email: req.body.email});
    //check the pw has been hashed
    expect(user.password).not.toBe(req.body.password);
  });
});
//define test suite for users route
describe("/users", () => {
  //beforeEach is a hook that runs before each individual test within this suite
  //before each test, empty database
  beforeEach( async () => {
    await User.deleteMany({});
  });
});
//this nested describe block groups test related to a POST request when both email and pw are provided
  describe("POST, when email and password are provided", () => {
    test("the response code is 201", async () => {
      let response = await request(app)// use supertest to make a request to our app
        .post("/users") //making a post request to /users
        //the data we're sending with the request
        .send({email: "poppy@email.com", password: "1234"})
        //response expected with code 201,means the resource was successfully created
      expect(response.statusCode).toBe(201)
    });

    test("a user is created", async () => {
      await request(app)
        .post("/users")
        .send({email: "scarlett@email.com", password: "1234"})
      let users = await User.find()//find all users in the database
      let newUser = users[users.length - 1]// newUser is the last user in the array of users
      expect(newUser.email).toEqual("scarlett@email.com")
      //expect to have a newUser's email to be the one we just sent in our POST request
    });

//the nested describe block groups tests related to a POST request when the pw is missing
  describe("POST, when password is missing", () => {
    test("response code is 400", async () => {
      let response = await request(app)
        .post("/users")
        .send({email: "skye@email.com"})
      expect(response.statusCode).toBe(400)//expect response status 400 means bad request
    });

    test("does not create a user", async () => {
      await request(app)
        .post("/users")
        .send({email: "skye@email.com"})
        let users = await User.find()
        //expect no user to be created, thus the of the array should be 0
        expect(users.length).toEqual(0)
    });
  });
  // this block groups tests related to a POST request when the email is missing
  describe("POST, when email is missing", () => {
    test("response code is 400", async () => {
      let response = await request(app)
        .post("/users")
        .send({password: "1234"})
      expect(response.statusCode).toBe(400)// 400 code, bad request expected
    });

    test("does not create a user", async () => {
      await request(app)
        .post("/users")
        .send({password: "1234"})
      let users = await User.find()
      expect(users.length).toEqual(0)
    });
  });
});