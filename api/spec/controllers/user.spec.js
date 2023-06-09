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

      describe("GET with username when token is present and response code is 200", () => {
        test("returns user first name, last name and username for a given username", async () => {
            let response = await request(app)
                .get("/user?username=testy")
                .set("Authorization", `Bearer ${token}`);
            let userDetails = response.body.user;
            expect(userDetails.firstName).toEqual("Test");
            expect(userDetails.lastName).toEqual("Testson");
            expect(userDetails.userName).toEqual("testy");
            expect(response.status).toEqual(200);
        })
    
        test("returns a new token", async () => {
          let response = await request(app)
              .get("/user?username=testy")
              .set("Authorization", `Bearer ${token}`);
        let newPayload = JWT.decode(response.body.token, process.env.JWT_SECRET);
        let originalPayload = JWT.decode(token, process.env.JWT_SECRET);
        expect(newPayload.iat > originalPayload.iat).toBeTruthy();
        })
      })

      describe("GET with username when token is missing", () => {
        test("returns an error", async () =>{
          let response = await request(app)
              .get("/user?username=testy")
              .set("Authorization", `Bearer `);
          let errMessage = response.body.message;
          expect(errMessage).toEqual("auth error");
        })

        test("the response code is 401", async () =>{
          let response = await request(app)
              .get("/user?username=testy")
              .set("Authorization", `Bearer `);
          expect(response.status).toEqual(401);
          
        })

        test("does not return a new token", async () =>{
          let response = await request(app)
              .get("/user?username=testy")
              .set("Authorization", `Bearer `);
          expect(response.body.token).toEqual(undefined);
        })

      })

      describe("GET, when username given doesn't exist", () => {
        test("returns an error", async () =>{
          let response = await request(app)
              .get("/user?username=wrongtesty")
              .set("Authorization", `Bearer ${token}`);
          let errMessage = response.body.message;
          expect(errMessage).toEqual("auth error");
          expect(response.status).toEqual(401);
        })

        test("does not return a new token", async () =>{
          let response = await request(app)
              .get("/user?username=wrongtesty")
              .set("Authorization", `Bearer ${token}`);      
          expect(response.body.token).toEqual(undefined);
        })

      })
  
});