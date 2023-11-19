const app = require("../../app");
const request = require("supertest");
require("../mongodb_helper");
const User = require('../../models/user');
const JWT = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

let token;

describe("/users/account", () => {
    beforeAll( async () => {
        const user = new User({username: "Test Name", email: "myemail@test.com", password: "mypassword", avatar: "0.svg"});
        await user.save();

        token = JWT.sign({
        user_id: user.id,
        // Backdate this token of 5 minutes
        iat: Math.floor(Date.now() / 1000) - (5 * 60),
        // Set the JWT token to expire in 10 minutes
        exp: Math.floor(Date.now() / 1000) + (10 * 60)
        }, secret);
    })

    describe("GET, when user_id is provided", () => {
        test("response code is 200", async () => {
            let response = await request(app)
                .get("/users/account")
                .set("Authorization", `Bearer ${token}`)
                .send({token: token});
            expect(response.status).toEqual(200);
        })

        test("returns user data (username, email address, password and avatar) for logged-in user", async () => {
            let response = await request (app)
            .get("/users/account")
            .set("Authorization", `Bearer ${token}`)
            .send({token: token});
            expect(response.body.user.username).toEqual("Test Name");
            expect(response.body.user.email).toEqual("myemail@test.com");
            expect(response.body.user.password).toEqual("mypassword");
            expect(response.body.user.avatar).toEqual("0.svg"); 
        })
    });
});
