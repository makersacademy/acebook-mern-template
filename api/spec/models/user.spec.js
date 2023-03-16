const mongoose = require("mongoose");

require("../mongodb_helper");
const User = require("../../models/user");

describe("User model", () => {
  let user1;
  let user2;
  beforeEach((done) => {
    mongoose.connection.collections.users.drop(() => {
      done();
    });
  });

  afterAll(async () => {
    await User.deleteMany({});
  });

  user1 = new User({
    name: "Someone One",
    username: "someone",
    email: "someone@example.com",
    password: "password",
  });

  user2 = new User({
    name: "User One",
    username: "someone",
    email: "user1@example.com",
    password: "password",
  });

  it("has an email address", () => {
    expect(user1.email).toEqual("someone@example.com");
  });

  it("has a password", () => {
    expect(user1.password).toEqual("password");
  });

  it("has a username", () => {
    expect(user1.username).toEqual("someone");
  });

  it("has a name", () => {
    expect(user1.name).toEqual("Someone One");
  });

  it("can list all users", (done) => {
    User.find((err, users) => {
      expect(err).toBeNull();
      expect(users).toEqual([]);
      done();
    });
  });

  it("can save a user", (done) => {
    user1.save((err) => {
      expect(err).toBeNull();

      User.find((error, users) => {
        expect(error).toBeNull();

        expect(users[0]).toMatchObject({
          name: "Someone One",
          username: "someone",
          email: "someone@example.com",
          password: "password",
        });
        done();
      });
    });
  });

  it("Throws an error when a user with a username that exists already", async () => {
    user1 = new User({
      name: "Someone One",
      username: "someone",
      email: "someone@example.com",
      password: "password",
    });

    user2 = new User({
      name: "User One",
      username: "someone",
      email: "user1@example.com",
      password: "password",
    });

    try {
      await user1.save();
      console.log(user1);
    } catch (error) {
      console.log(error);
      expect(error).toBeNull();
      throw error;
    }

    try {
      await user2.save();
      console.log(user2);
    } catch (error) {
      console.log(error);
      expect(error).not.toBeNull();
      throw error;
    }
  });
});
