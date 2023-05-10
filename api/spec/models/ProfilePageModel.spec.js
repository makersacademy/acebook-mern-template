const mongoose = require("mongoose");

require("../mongodb_helper");
const Profile = require("../../models/profilePageModel");

// describe("Profile Page Model", () => {
//     beforeEach((done) => {
//         mongoose.connection.collection.profiles.drop(() => {
//             done();
//         })
//     })
// })

// the above will create a connection to the profiles.js found on the controllers folder once created.
// beforeEach creates a hook onto the profiles.js and clears it up every time a test is run so no info is stored into the database

it("has an email address", () => {
    const user = new Profile({
      email: "someone@example.com",
    });
    expect(user.email).toEqual("someone@example.com");
  });

  it("has a password", () => {
    const user = new Profile({
      password: "password",
    });
    expect(user.password).toEqual("password");
  });

  it("has firstName, lastName and profile picture", () => {
    const user = new Profile({
        firstName: "Betty",
        lastName: "Rubble",
        picture: Buffer.from('picture'),
    });
expect(user.firstName).toEqual("Betty")
expect(user.lastName).toEqual("Rubble")
expect(user.picture).toEqual(Buffer.from('picture'))
  });


