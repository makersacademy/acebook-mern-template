const app = require("../../app");
const request = require("supertest");
require("../mongodb_helper");
const User = require("../../models/user");
const JWT = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;
const Post = require('../../models/post');

let token;

describe("/posts", () => {
    beforeAll( async () => {
    const user = new User({displayName: "Perfect Person", email: "test@test.com", password: "12345678"});
    await user.save();

    token = JWT.sign({
        user_id: user.id,
      // Backdate this token of 5 minutes
      iat: Math.floor(Date.now() / 1000) - (5 * 60),
      // Set the JWT token to expire in 10 minutes
      exp: Math.floor(Date.now() / 1000) + (10 * 60)
    }, secret);
    });

    beforeEach( async () => {
    await Post.deleteMany({});
    })

    afterAll( async () => {
    await User.deleteMany({});
    await Post.deleteMany({});
    });

    describe('Put Likes Route', () => {
        test("responds with a 201", async () => {

        let response = await request(app)
            .post("/posts")
            .set("Authorization", `Bearer ${token}`)
            .send({ message: "hello world", userId: '6555fb6dc0a21062095c4a2a', token: token });
            
        let response2 = await request(app)
            .put(`/users/likes`)
            .set('Authorization', `Bearer ${token}`)
            .send({ postId: '6555fb6dc0a21062095c4a2b' })
            .expect(201);
            expect(response2.body.message).toBe('PostId added successfully');
            expect(response2.body.likedPostIds).toEqual(["6555fb6dc0a21062095c4a2b"]);
        
        let response3 = await request(app)
            .put(`/users/likes`)
            .set('Authorization', `Bearer ${token}`)
            .send({ postId: '6555fb6dc0a21062095c4a2c' })
            .expect(201);
            expect(response3.body.message).toBe('PostId added successfully');
            expect(response3.body.likedPostIds).toEqual(["6555fb6dc0a21062095c4a2b", "6555fb6dc0a21062095c4a2c"]);
        
        let response4 = await request(app)
            .put(`/users/likes`)
            .set('Authorization', `Bearer ${token}`)
            .send({ postId: '6555fb6dc0a21062095c4a2c' })
            .expect(201);
            expect(response4.body.message).toBe('PostId removed successfully');
            expect(response4.body.likedPostIds).toEqual(["6555fb6dc0a21062095c4a2b"]);
})})});
