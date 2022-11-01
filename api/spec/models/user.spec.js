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
      username: "Ben Smith"
    });
    expect(user.email).toEqual("someone@example.com");
  });

  it("has an name", () => {
    const user = new User({
      email: "someone@example.com",
      password: "password",
      username: "Ben Smith"
    });
    expect(user.username).toEqual("Ben Smith");
  });

  it("has a password", () => {
    const user = new User({
      email: "someone@example.com",
      password: "password",
      username: "Ben Smith"
    });
    expect(user.password).toEqual("password");
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
      username: "Ben Smith"
    });

    user.save((err) => {
      expect(err).toBeNull();

      User.find((err, users) => {
        expect(err).toBeNull();

        expect(users[0]).toMatchObject({
          email: "someone@example.com",
          password: "password",
          username: "Ben Smith"
        });
        done();
      });
    });
  });

  // it("", () => {
  //   const user = new User({
  //     email: "someone@example.com",
  //     password: "password",
  //     username: 12
  //   });
  //   expect(user.username).toEqual(1234);
  // });
});
