
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
      followers: [],
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
      
    
    it("can save user", (done) => {
      const user = new User({
        email: "test@gmail.com",
        password: "password",
        username: "TestUser",
        followers: [],
        photograph: "",
        posts: [],
        comments: []
      });
      user.save((err) => {
        expect(err).toBeNull;

        User.find((err, users) => {
          expect(err).toBeNull();

          expect(users[0].username).toEqual('TestUser');
          expect(users[0].email).toEqual('test@gmail.com');
          expect(users[0].password).toEqual('password');
          expect(users[0].followers.length).toEqual(0);
          expect(users[0].photograph).toEqual("");
          expect(users[0].posts.length).toEqual(0);
          expect(users[0].comments.length).toEqual(0);
          
        done();
        })
      })
    })


    });

    


