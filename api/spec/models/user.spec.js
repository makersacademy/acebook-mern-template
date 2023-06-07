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
      password: "password",
      firstName: "John",
      lastName: "Smith",
      userName: "js93",
    });
    expect(user.email).toEqual("someone@example.com");
   
  });

  it("has a password", () => {
    const user = new User({
      email: "someone@example.com",
      password: "password",
      firstName: "John",
      lastName: "Smith",
      userName: "js93",
    });
    expect(user.password).toEqual("password");
  });
  it("has a name", () => {
    const user = new User({
      email: "someone@example.com",
      password: "password",
      firstName: "John",
      lastName: "Smith",
      userName: "js93",
    });
    expect(user.firstName).toEqual("John");
    expect(user.lastName).toEqual("Smith");
  });
  it("has a username", () => {
    const user = new User({
      email: "someone@example.com",
      password: "password",
      firstName: "John",
      lastName: "Smith",
      userName: "js93",
    });
    expect(user.userName).toEqual("js93");
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
      password: "password",
      firstName: "John",
      lastName: "Smith",
      userName: "js93",
    });

    user.save((err) => {
      expect(err).toBeNull();

      User.find((err, users) => {
        expect(err).toBeNull();

        expect(users[0]).toMatchObject({
          email: "someone@example.com",
          password: "password",
          firstName: "John",
          lastName: "Smith",
          userName: "js93",
        });
        done();
      });
    });
  });
});
