const mongoose = require("mongoose");

require("../mongodb_helper");
const User = require("../../models/user");

describe("User model", () => {
  beforeEach((done) => {
    mongoose.connection.collections.users.drop(() => {
      done();
    });
  });

  it("has a display name", () => {
    const user = new User({
      displayName: "Perfect Person",
      email: "someone@example.com",
      password: "password",
    });
    expect(user.displayName).toEqual("Perfect Person");
  })

  it("has an email address", () => {
    const user = new User({
      displayName: "Perfect Person",
      email: "someone@example.com",
      password: "password",
    });
    expect(user.email).toEqual("someone@example.com");
  });

  it("has a password", () => {
    const user = new User({
      displayName: "Perfect Person",
      email: "someone@example.com",
      password: "password",
    });
    expect(user.password).toEqual("password");
  });

  it("has an empty array in likedPostsIds by default", () => {
    const user = new User({
      displayName: "Perfect Person",
      email: "someone@example.com",
      password: "password",
    });
    const postids = user.likedPostIds.toObject();
    expect(postids).toEqual(expect.arrayContaining([]));
  });

  it("has an array of liked post ids", () => {
    const user = new User({
      displayName: "Perfect Person",
      email: "someone@example.com",
      password: "password",
      likedPostIds: ["655610f9c0797313bf5dec1a", "655610f9c0797313bf5dec1b", "655610f9c0797313bf5dec1ac"]
    });
    expect(user.likedPostIds).toEqual(expect.arrayContaining(["655610f9c0797313bf5dec1a", "655610f9c0797313bf5dec1b", "655610f9c0797313bf5dec1ac"]));
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
      displayName: "Perfect Person",
      email: "someone@example.com",
      password: "password",
    });

    user.save((err) => {
      expect(err).toBeNull();

      User.find((err, users) => {
        expect(err).toBeNull();

        expect(users[0]).toMatchObject({
          displayName: "Perfect Person",
          email: "someone@example.com",
          password: "password",
        });
        done();
      });
    });
  });
});
