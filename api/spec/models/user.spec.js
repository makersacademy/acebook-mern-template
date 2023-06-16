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
      name: "someone",
    });
    expect(user.email).toEqual("someone@example.com");
  });

  it("has a password", () => {
    const user = new User({
      email: "someone@example.com",
      password: "password",
      name: "someone",
    });
    expect(user.password).toEqual("password");
  });

  it("has a friends array", () => {
    const user = new User({
      email: "someone@example.com",
      password: "password",
      name: "someone",
    });
    expect(user.friends.toObject()).toEqual([])
  })

  it("has a name", () => {
    const user = new User({
      email: "someone@example.com",
      password: "password",
      name: "someone",
    });
    expect(user.name).toEqual("someone");
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
      name: "someone",
    });

    user.save((err) => {
      expect(err).toBeNull();

      User.find((err, users) => {
        expect(err).toBeNull();

        expect(users[0]).toMatchObject({
          email: "someone@example.com",
          name: "someone",
        });
        done();
      });
    });
  });
});
