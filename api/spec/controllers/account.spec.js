const app = require("../../app");
const request = require("supertest");
require("../mongodb_helper");
const User = require('../../models/user');
const JWT = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

let token;

describe("Testing data is returned for already existant users (account and profile feed pages)", () => {
    beforeAll( async () => {
        user = new User({username: "Test Name", email: "myemail@test.com", password: "mypassword", avatar: "0.svg"});
        await user.save();

        token = JWT.sign({
        user_id: user.id,
        // Backdate this token of 5 minutes
        iat: Math.floor(Date.now() / 1000) - (5 * 60),
        // Set the JWT token to expire in 10 minutes
        exp: Math.floor(Date.now() / 1000) + (10 * 60)
        }, secret);
    })

    //Testing route used by UserHeader component (used in Account and UserProfileFeed pages) to obtain username and avatar data
    describe("GET using route '/users/data/:user_id'", () => {
        test("response code is 200", async () => {
            let response = await request(app)
                .get(`/users/data/${user._id}`)
                .set("Authorization", `Bearer ${token}`)
                .send({token: token});
            expect(response.status).toEqual(200);
        })
 
        test("returns user data (username, email address, password, avatar and id) for user based on user_id in URL", async () => {
            let response = await request (app)
            .get(`/users/data/${user._id}`)
            .set("Authorization", `Bearer ${token}`)
            .send({token: token});
            expect(response.body.user.username).toEqual("Test Name");
            expect(response.body.user.email).toEqual("myemail@test.com");
            expect(response.body.user.password).toEqual("mypassword");
            expect(response.body.user.avatar).toEqual("0.svg");
            expect(response.body.user._id).toEqual(String(user._id)); 
        })
    });

    // // Tests to check route for Account works - currently no function.    
    // describe("GET, using using users/my_account route", () => {
    //     test("response code is 200", async () => {
    //         let response = await request(app)
    //             .get("/users/my_account")
    //             .set("Authorization", `Bearer ${token}`)
    //             .send({token: token});
    //         expect(response.status).toEqual(200);
    //     })


    //     test("returns correct user_id for logged-in user", async () => {
    //         let response = await request (app)
    //             .get("/users/my_account")
    //             .set("Authorization", `Bearer ${token}`)
    //             .send({token: token});
    //         expect(response.body.user_id).toEqual(String(user._id)); 
    //     })    
    // });
});
