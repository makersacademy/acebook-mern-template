const mongoose = require("mongoose");

require("../mongodb_helper");
const User = require("../../models/user");

describe("User model", () => {
  beforeEach((done) => {
    mongoose.connection.collections.users.drop(() => {
      done();
    });
  });

  it("has an image URL", () => {
    const user = new User({
      imageURL: "www.placeholder-img.com",
      name: "Noelia",
      email: "someone@example.com",
      password: "password",
    });
    expect(user.imageURL).toEqual("www.placeholder-img.com");
  })

  it("has a username", () => {
    const user = new User({
      imageURL: "www.placeholder-img.com",
      name: "Noelia",
      email: "someone@example.com",
      password: "password",
    });
    expect(user.name).toEqual("Noelia");
  });

  it("has an email address", () => {
    const user = new User({
      imageURL: "www.placeholder-img.com",
      name: "Noelia",
      email: "someone@example.com",
      password: "password",
    });
    expect(user.email).toEqual("someone@example.com");
  });

  it("has a password", () => {
    const user = new User({
      imageURL: "www.placeholder-img.com",
      name: "Noelia",
      email: "someone@example.com",
      password: "password",
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
      imageURL: "www.placeholder-img.com",
      name: "Jack",
      email: "someone@example.com",
      password: "password",
    });

    user.save((err) => {
      expect(err).toBeNull();

      User.find((err, users) => {
        expect(err).toBeNull();

        expect(users[0]).toMatchObject({
          imageURL: "www.placeholder-img.com",
          name: "Jack",
          email: "someone@example.com",
          password: "password",
        });
        done();
      });
    });
  });
});
