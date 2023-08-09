const app = require("../../app");
const request = require("supertest");
require("../mongodb_helper");
const Post = require('../../models/post');
const User = require('../../models/user');
const JWT = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

let token;
let user;
let savedUser;
let savedDummyPost;
let savedPost;
let post;

describe("/posts/:id", () => {
    beforeAll( async () => {
    await User.deleteMany({});
    await Post.deleteMany({});
        
    user = new User({email: "test@test.com", password: "12345678", username: 'person1'});
    savedUser = await user.save();
    
    post = new Post({ message: "Hello", user_id: savedUser.id})
    savedDummyPost = await post.save();
    const fetchedPost = await Post.findById(savedDummyPost.id).populate("user_id", "username");
    savedPost = await fetchedPost.save();
    
    token = JWT.sign({
        user_id: savedUser.id,
        iat: Math.floor(Date.now() / 1000) - (5 * 60),
        exp: Math.floor(Date.now() / 1000) + (10 * 60)
      }, secret);
    })

    afterAll( async () => {
        await User.deleteMany({});
        await Post.deleteMany({});
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
    expect(response.body.author).toEqual('person1')
    })
    

    test("returns auth error without token visiting non post page", async () => {
        let response = await request(app)
        .get(`/posts/4eb6e7e7e9b7f4194e000001`)
    expect(response.status).toEqual(401)
    })
    test("returns auth error without token visiting valid post page", async () => {
        let response = await request(app)
        .get(`/posts/${savedPost.id}`)
    expect(response.status).toEqual(401)
    })
})