const app = require("../../app");
const request = require("supertest");
require("../mongodb_helper");
const User = require('../../models/user');
const JWT = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

let token;

describe("/user", () => {
    beforeAll( async () => {
        const user = new User({
          email: "test@test.com",
          password: "12345678",
          firstName: "Test",
          lastName: "Testson",
          userName: "testy"
        });
        await user.save();
    
        token = JWT.sign({
          user_id: user.id,
          // Backdate this token of 5 minutes
          iat: Math.floor(Date.now() / 1000) - (5 * 60),
          // Set the JWT token to expire in 10 minutes
          exp: Math.floor(Date.now() / 1000) + (10 * 60)
        }, secret);
      });

      afterAll( async () => {
        await User.deleteMany({});
      })

      describe("GET, when token is present", () => {
        test("returns user first name, last name and username for a given user password", async () => {
            const email = "test@test.com";
            let response = await request(app)
                .get("/user")
                .set("Authorization", `Bearer ${token}`)
                .send({
                    email: email,
                    token: token});
            let userDetails = response.body.user;
            expect(userDetails.firstName).toEqual("Test");
            expect(userDetails.lastName).toEqual("Testson");
            expect(userDetails.userName).toEqual("testy");
        })
    
        test("the response code is 200", async () => {
          const email = "test@test.com";
          let response = await request(app)
              .get("/user")
              .set("Authorization", `Bearer ${token}`)
              .send({
                  email: email,
                  token: token});
          let userDetails = response.body.user;
          expect(response.status).toEqual(200);
        })
    
        test("returns a new token", async () => {
          const email = "test@test.com";
          let response = await request(app)
              .get("/user")
              .set("Authorization", `Bearer ${token}`)
              .send({
                  email: email,
                  token: token});
        let newPayload = JWT.decode(response.body.token, process.env.JWT_SECRET);
        let originalPayload = JWT.decode(token, process.env.JWT_SECRET);
        expect(newPayload.iat > originalPayload.iat).toBeTruthy();
        })
      })

      describe("GET, when token is missing", () => {
        test("returns an error", async () =>{
          const email = "test@test.com";
          let response = await request(app)
              .get("/user")
              .set("Authorization", `Bearer `)
              .send({
                  email: email,
                  token: token});
          let errMessage = response.body.message;
          expect(errMessage).toEqual("auth error");
        })

        test("the response code is 401", async () =>{
          const email = "test@test.com";
          let response = await request(app)
              .get("/user")
              .set("Authorization", `Bearer `)
              .send({
                  email: email,
                  token: token});
          expect(response.status).toEqual(401);
        })

        test("does not return a new token", async () =>{
          const email = "test@test.com";
          let response = await request(app)
              .get("/user")
              .set("Authorization", `Bearer `)
              .send({
                  email: email,
                  token: token});
          expect(response.body.token).toEqual(undefined);
        })


      })


});