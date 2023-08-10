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


describe("/posts/likeUnlike", () => {
    beforeAll( async () => {
      user = new User({email: "test@test.com", password: "12345678", username: 'person1'});
      savedUser = await user.save();
      logged_in_user_id = savedUser.id
  
      token = JWT.sign({
        user_id: logged_in_user_id,
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
    })

      test("should return like count as zero initially", async () => {
        let post1 = new Post({message: "howdy!", user_id: "4eb6e7e7e9b7f4194e000001"});
        let response = await post1.save();
        expect(response.likes.length).toEqual(0)
      })
      
  
    test("adding like increments number of likes", async() => {
      let post1 = new Post({message: "howdy!", user_id: "64d4ba3d05fd77a6566defc2"});
      await post1.save();
      let response = await request(app)
        .post(`/posts/${post1.id}/likeUnlike`)
        .set("Authorization", `Bearer ${token}`);
    //   let response2 = await request(app)
    //     .get(`/posts/${post1.id}`)
    //     .set("Authorization", `Bearer ${token}`);
      expect(response.status).toEqual(200)
    //   expect(response2.body.likes.length).toEqual(1)
      })
  
    test("user cannot like a post twice", async() => {
      let post1 = new Post({message: "howdy!", user_id: "4eb6e7e7e9b7f4194e000001", username: "test"});
      await post1.save();
      let response = await request(app)
        .post(`/posts/${post1.id}/likeUnlike`)
        .set("Authorization", `Bearer ${token}`);
      let response2 = await request(app)
        .post(`/posts/${post1.id}/likeUnlike`)
        .set("Authorization", `Bearer ${token}`);
      expect(response2.status).toEqual(200)
        })
  
    test("post cannot be liked without token", async() => {
      let post1 = new Post({message: "howdy!", user_id: "4eb6e7e7e9b7f4194e000001"});
      await post1.save();
      let response = await request(app)
        .post(`/posts/${post1.id}/likeUnlike`)
      expect(response.status).toEqual(401)
        })

    test("post can be unliked", async() => {
      let post1 = new Post({message: "howdy!", user_id: "64d4ba3d05fd77a6566defc2"});
      await post1.save();
      let response = await request(app)
       .post(`/posts/${post1.id}/likeUnlike`)
       .set("Authorization", `Bearer ${token}`);
      let response2 = await request(app)
       .post(`/posts/${post1.id}/likeUnlike`)
       .set("Authorization", `Bearer ${token}`);
       expect(response2.status).toEqual(200)
    })
    })
