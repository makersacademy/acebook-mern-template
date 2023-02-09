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
      firstName: "Some",
      lastName: "One",
    });
    expect(user.email).toEqual("someone@example.com");
  });

  it("has a password", () => {
    const user = new User({
      email: "someone@example.com",
      password: "password",
      firstName: "Some",
      lastName: "One",
    });
    expect(user.password).toEqual("password");
  });

  it("has a first name", () => {
    const user = new User({
      email: "someone@example.com",
      password: "password",
      firstName: "Some",
      lastName: "One",
    });
    expect(user.firstName).toEqual("Some");
  });

  it("has a last name", () => {
    const user = new User({
      email: "someone@example.com",
      password: "password",
      firstName: "Some",
      lastName: "One",
    });
    expect(user.lastName).toEqual("One");
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
      firstName: "Some",
      lastName: "One",
    });

    user.save((err) => {
      expect(err).toBeNull();

      User.find((err, users) => {
        expect(err).toBeNull();

        expect(users[0]).toMatchObject({
          email: "someone@example.com",
          password: "password",
          firstName: "Some",
          lastName: "One",
        });
        done();
      });
    });
  });
});
