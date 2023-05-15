const app = require("../../app");
const request = require("supertest");
require("../mongodb_helper");
const User = require('../../models/user')

describe("/users", () => {
  beforeEach(async () => {
    await User.deleteMany({}); 
  });

  describe("PUT, when user details are provided", () => {
    let user;
    beforeEach(async () => {
      user = new User({
        email: "daved@test.com",
        password: "5678",
        firstName: "Dave",
        lastName: "David"
      });
      await user.save();
    });


    it('should return a 200 and OK code', async () => {
      const newUserData = {
        firstName: 'John',
      };
      const res = await request(app)
        .put("/usersUpdate/")
        .send(newUserData);
  
      expect(res.statusCode).toEqual(200);
      expect(res.body.message).toEqual('OK');
  
    });

    it('should update the users name', async () =>{
      const newUserData = {
        firstName: "John"
      }

      const res = await request(app)
        .put(`/usersUpdate/${user._id}`)
        .send(newUserData);

      const updatedUser = await User.findById(user._id);
      expect(updatedUser.firstName).toEqual(newUserData.firstName);
    })

  });
});
