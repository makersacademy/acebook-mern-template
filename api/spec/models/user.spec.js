
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
      email: "test@gmail.com",
      password: "password",
      username: "TestUser",
      follwers: [],
      photograph: "",
      posts: [],
      comments: [],
    });
    console.log(typeof user.followers)
      expect(user.email).toEqual("test@gmail.com");
      expect(user.password).toEqual("password");
      expect(user.username).toEqual("TestUser");
      expect(user.followers.length).toEqual(0);
      expect(user.photograph).toEqual("");
      expect(user.posts.length).toEqual(0);
      expect(user.comments.length).toEqual(0);
    });

    it("can list all users", (done) => {
          User.find((err, users) => {
            expect(err).toBeNull();
            expect(users).toEqual([]);
            done();
          });
      });
      


    });

    


    // it("can save a user", (done) => {
    //   const user = new User({
    //     email: "test@gmail.com",
    //     password: "password",
    //     username: "TestUser",
    //     follwers: [],
    //     photograph: "",
    //     posts: [],
    //     comments: [],,
    //       });
    //       user.save((err) => {
    //               expect(err).toBeNull();
            
    //               User.find((err, users) => {
    //                 expect(err).toBeNull();
            
    //                 expect(users[0]).toMatchObject({
    //                   email: "test@gmail.com",
    //                   password: "password",
    //                   username: "TestUser",
    //                   follwers: [],
    //                   photograph: "",
    //                   posts: [],
    //                   comments: [],
    //                 });
    //                 done();
    //               });
    //             });
    //           });

          









//   it("can save a user", (done) => {
//     const user = new User({
//       email: "someone@example.com",
//       password: "password",
//     });

//     user.save((err) => {
//       expect(err).toBeNull();

//       User.find((err, users) => {
//         expect(err).toBeNull();

//         expect(users[0]).toMatchObject({
//           email: "someone@example.com",
//           password: "password",
//         });
//         done();
//       });
//     });
//   });
// });
