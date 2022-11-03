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
      firstName: "some",
      lastName: "one"
    });
    expect(user.email).toEqual("someone@example.com");
  });

  it("has a password", () => {
    const user = new User({
      email: "someone@example.com",
      password: "password",
      firstName: "some",
      lastName: "one"
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
      firstName: "some",
      lastName: "one"
    });

    user.save((err) => {
      expect(err).toBeNull();

      User.find((err, users) => {
        expect(err).toBeNull();

        expect(users[0]).toMatchObject({
          email: "someone@example.com",
          password: "password",
          firstName: "some",
          lastName: "one"
        });
        done();
      });
    });
  });

  // TODO: Finish this test. Testing the friendslist.
  it('can add friends', (done) => {
    // Create 3 users
    const user1 = new User({
      email: "some1@example.com",
      password: "password",
      firstName: "Spongebob",
      lastName: "Squarepants"
    });
    const user2 = new User({
      email: "some2@example.com",
      password: "password",
      firstName: "Sandy",
      lastName: "Cheeks"
    });
    const user3 = new User({
      email: "some3@example.com",
      password: "password",
      firstName: "Eugene",
      lastName: "Krabs"
    });

    // Save all 3 users on the database.
    user1.save()
    user2.save()
    user2.save()
    let spongebob = User.findOne({name: "spongebob"})
    console.log(spongebob)
    done()
  })
});
