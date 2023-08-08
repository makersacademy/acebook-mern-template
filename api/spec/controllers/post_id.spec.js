const app = require("../../app");
const request = require("supertest");
require("../mongodb_helper");
const Post = require('../../models/post');
const User = require('../../models/user');
const JWT = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

let token;
let user;
let logged_in_user_id;
let savedUser;
let savedPost;

describe("/posts/:id", () => {
    beforeAll( async () => {
    user = new User({email: "test@test.com", password: "12345678", username: 'person1'});
    user2 = new User({email: "test1@test.com", password: "12345678", username: 'person12'});
    savedUser = await user.save();
    savedUser2 = await user2.save();

    post = new Post({ message: "Hello", user_id: savedUser._id})
    post2 = new Post({ message: "Hello2", user_id: savedUser._id})
    savedPost = await post.save();
    savedPost2 = await post2.save();
    })

    afterAll( async () => {
        await User.deleteMany({});
        await Post.deleteMany({});
      })

    describe("get post info when token is present", () => {
        beforeAll( async () => {
            token = JWT.sign({
                user_id: logged_in_user_id,
                // Backdate this token of 5 minutes
                iat: Math.floor(Date.now() / 1000) - (5 * 60),
                // Set the JWT token to expire in 10 minutes
                exp: Math.floor(Date.now() / 1000) + (10 * 60)
              }, secret);
        })
        afterAll( async () =>{
            token = undefined
        })
        test("invalid post id returns error", async () => {
            let response = await request(app)
            .get(`/posts/4eb6e7e7e9b7f4194e000001`)
            .set("Authorization", `Bearer ${token}`)
        expect(response.status).toEqual(404)
        })
        test("anyone can see post id page with token", async () => {
            let response = await request(app)
            .get(`/posts/${savedPost.id}`)
            .set("Authorization", `Bearer ${token}`)
        expect(response.status).toEqual(200)
        expect(response.body.message).toEqual("Hello")
        expect(response.body.username).toEqual("person1")
        expect(response.body.message).not.toEqual("Hello2")
        })


    describe("visibility without token", () => {
        test("invalid post id returns error", async () => {
            let response = await request(app)
            .get(`/posts/4eb6e7e7e9b7f4194e000001`)
        expect(response.status).toEqual(401)
        })
        test("anyone can see post id page", async () => {
            let response = await request(app)
            .get(`/posts/${savedPost.id}`)
        expect(response.status).toEqual(401)
        })
    })
    })
})