const mongoose = require("mongoose");

require("../mongodb_helper");
const User = require("../../models/user");

describe("User model", () => {
  beforeEach((done) => {
    mongoose.connection.collections.users.drop(() => {
      done();
    });
  });

  it("has an email address", () => {
    const user = new User({
      email: "someone@example.com",
      username: "exampleusername",
      password: "password",
    });
    expect(user.email).toEqual("someone@example.com");
  });

  it("has a password", () => {
    const user = new User({
      email: "someone@example.com",
      username: "exampleusername",
      password: "password",
    });
    expect(user.password).toEqual("password");
  });
  it("has a username", () => {
    const user = new User({
      email: "someone@example.com",
      username: "exampleusername",
      password: "password",
    });
    expect(user.username).toEqual("exampleusername");
  });

  it("can list all users", (done) => {
    User.find((err, users) => {
      expect(err).toBeNull();
      expect(users).toEqual([]);
      done();
    });
  });

  it("can save a user", (done) => {
    const user = new User({
      email: "someone@example.com",
      username: "exampleusername",
      password: "password",
    });

    user.save((err) => {
      expect(err).toBeNull();

      User.find((err, users) => {
        expect(err).toBeNull();

        expect(users[0]).toMatchObject({
          email: "someone@example.com",
          username: "exampleusername",
          password: "password",
        });
        done();
      });
    });
  });

  // no idea how to write a test for GET/users/:id :( when we don't know the id of any users -- 
  // TODO: USE MOCKS? 
  it("can find a user by its id", (done) => {

      // Create random user
    const user = new User({
      email: "someone@example.com",
      username: "exampleusername",
      password: "password",
    });

    // Save random user to DB
    user.save((err) => {
      expect(err).toBeNull();

      User.find((err, users) => {
        expect(err).toBeNull();

        console.log("LOGGING LOGGING LOGGING LOGGING LOGGING LOGGING LOGGING LOGGING LOGGING LOGGING ");
        console.log(users);

        done();
      });
    });

      // Get the first user, and get their ID 

      // Execute Get Request passing in this USER ID

      // Expect user.name to match
      // expect(users[0]).toMatchObject({
      //   email: "someone@example.com",
      //   username: "exampleusername",
      //   password: "password",
      // });
      done();
  });
});
