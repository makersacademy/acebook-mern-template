const app = require("../../app");
const request = require("supertest");
require("../mongodb_helper");
const Post = require('../../models/post');
const User = require('../../models/user');
const JWT = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;
//var mongoose = require("mongoose");

let token;

// const convertStringToObjectId = (idString) => {
//   return mongoose.Types.ObjectId(idString);
// }

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
    })

    describe("POST, when token is present", () => {
    test("responds with a 201", async () => {
    let response = await request(app)
        .post("/posts")
        .set("Authorization", `Bearer ${token}`)
        .send({ message: "hello world", token: token });
    expect(response.status).toEqual(201);
    });

    test("creates a new post", async () => {
    await request(app)
        .post("/posts")
        .set("Authorization", `Bearer ${token}`)
        .send({ message: "hello world", token: token });
    let posts = await Post.find();
    expect(posts.length).toEqual(1);
    expect(posts[0].message).toEqual("hello world");
    });

    test("returns a new token", async () => {
    let response = await request(app)
        .post("/posts")
        .set("Authorization", `Bearer ${token}`)
        .send({ message: "hello world", token: token })
        let newPayload = JWT.decode(response.body.token, process.env.JWT_SECRET);
        let originalPayload = JWT.decode(token, process.env.JWT_SECRET);
        expect(newPayload.iat > originalPayload.iat).toEqual(true);
    });  
    });

    describe("POST, when token is missing", () => {
    test("responds with a 401", async () => {
        let response = await request(app)
        .post("/posts")
        .send({ message: "hello again world" });
        expect(response.status).toEqual(401);
    });

    test("a post is not created", async () => {
        await request(app)
        .post("/posts")
        .send({ message: "hello again world" });
        let posts = await Post.find();
        expect(posts.length).toEqual(0);
    });

    test("a token is not returned", async () => {
        let response = await request(app)
        .post("/posts")
        .send({ message: "hello again world" });
        expect(response.body.token).toEqual(undefined);
    });
    })

describe("GET, when token is present", () => {
    test("returns every post in the collection", async () => {
        let post1 = new Post({message: "howdy!", author: '6555fb6dc0a21062095c4a2b'});
        let post2 = new Post({message: "hola!", author: '6555fb6dc0a21062095c4a2c'});
        await post1.save();
        await post2.save();
        let response = await request(app)
        .get("/posts")
        .set("Authorization", `Bearer ${token}`)
        .send({token: token});
        let messages = response.body.posts.map((post) => ( post.message ));
        expect(messages).toEqual(["howdy!", "hola!"]);
    })

    test("the response code is 200", async () => {
        let post1 = new Post({message: "howdy!", author: '6555fb6dc0a21062095c4a2b'});
        let post2 = new Post({message: "hola!", author: '6555fb6dc0a21062095c4a2c'});
        await post1.save();
        await post2.save();
        let response = await request(app)
        .get("/posts")
        .set("Authorization", `Bearer ${token}`)
        .send({token: token});
        expect(response.status).toEqual(200);
    })

    test("returns a new token", async () => {
        let post1 = new Post({message: "howdy!", author: '6555fb6dc0a21062095c4a2b'});
        let post2 = new Post({message: "hola!", author: '6555fb6dc0a21062095c4a2c'});
        await post1.save();
        await post2.save();
        let response = await request(app)
        .get("/posts")
        .set("Authorization", `Bearer ${token}`)
        .send({token: token});
        let newPayload = JWT.decode(response.body.token, process.env.JWT_SECRET);
        let originalPayload = JWT.decode(token, process.env.JWT_SECRET);
        expect(newPayload.iat > originalPayload.iat).toEqual(true);
    })
    })

    describe("GET, when token is missing", () => {
    test("returns no posts", async () => {
        let post1 = new Post({message: "howdy!", author: '6555fb6dc0a21062095c4a2b'});
        let post2 = new Post({message: "hola!", author: '6555fb6dc0a21062095c4a2c'});
        await post1.save();
        await post2.save();
        let response = await request(app)
        .get("/posts");
        expect(response.body.posts).toEqual(undefined);
    })

    test("the response code is 401", async () => {
        let post1 = new Post({message: "howdy!", author: '6555fb6dc0a21062095c4a2b'});
        let post2 = new Post({message: "hola!", author: '6555fb6dc0a21062095c4a2c'});
        await post1.save();
        await post2.save();
        let response = await request(app)
        .get("/posts");
        expect(response.status).toEqual(401);
    })

    test("does not return a new token", async () => {
        let post1 = new Post({message: "howdy!", author: '6555fb6dc0a21062095c4a2b'});
        let post2 = new Post({message: "hola!", author: '6555fb6dc0a21062095c4a2c'});
        await post1.save();
        await post2.save();
        let response = await request(app)
        .get("/posts");
        expect(response.body.token).toEqual(undefined);
    })
    });


beforeEach(async () => {
    await Post.deleteMany({});
    await User.deleteMany({});
});

// Mock user data for JWT token creation
const mockUserData = {
    _id: 'mockUserId',
    displayName: 'mockUser',
};

// Mock JWT token
const mockToken = JWT.sign(mockUserData, process.env.JWT_SECRET);

describe('Put Comment Route', () => {
describe('PUT /posts/:id', () => {
    it('should add a comment to a post', async () => {
      // Create a mock post in the database
        const mockPost = new Post({message: "howdy!", author: '6555fb6dc0a21062095c4a2b'});
        await mockPost.save();

        const commentData = {
        comment: 'A new comment',
        };

        const response = await request(app)
        .put(`/posts/${mockPost._id}`)
        .set('Authorization', `Bearer ${mockToken}`)
        .send(commentData)
        .expect(201);

      // Add assertions to check the response
        expect(response.body.message).toBe('Comment added successfully');
        expect(response.body.token).toBeDefined();
        expect(response.body.updatedPost).toBeDefined();

      // Check if the comment was added to the post in the database
        const updatedPost = await Post.findById(mockPost._id);
        expect(updatedPost.comments.length).toBe(1);
        expect(updatedPost.comments[0].comment_message).toBe('A new comment');

      // Add more assertions based on the expected behavior of your application
    });
    });
});

beforeEach(async () => {
    await Post.deleteMany({});
    await User.deleteMany({});
});

describe('Put Likes Route', () => {
describe('PUT /posts/:id/likes', () => {
    it('should initiate at 0', async () => {
      // Create a mock post in the database
        const mockPost = new Post({message: "howdy!", author: '6555fb6dc0a21062095c4a2b'});
        await mockPost.save();

        const likesData = {
        likes: 0,
        };

    const response = await request(app)
        .put(`/posts/${mockPost._id}/likes`)
        .set('Authorization', `Bearer ${mockToken}`)
        .send(likesData)
        .expect(201);

      // Add assertions to check the response
        expect(response.body.message).toBe('Like added successfully');
        expect(response.body.token).toBeDefined();
        expect(response.body.updatedPost).toBeDefined();

      // Check if the comment was added to the post in the database
        const updatedPost = await Post.findById(mockPost._id);
        expect(updatedPost.likes).toBe(0);
    });
    });
});

beforeEach(async () => {
    await Post.deleteMany({});
    await User.deleteMany({});
});

describe('Put Likes Route', () => {
    describe('PUT /posts/:id/likes', () => {
    it('should add a like to a post', async () => {
      // Create a mock post in the database
        const mockPost = new Post({message: "howdy!", author: '6555fb6dc0a21062095c4a2b'});
        await mockPost.save();

        const likesData = {
        likes: 1,
        };

        const response = await request(app)
        .put(`/posts/${mockPost._id}/likes`)
        .set('Authorization', `Bearer ${mockToken}`)
        .send(likesData)
        .expect(201);

      // Add assertions to check the response
        expect(response.body.message).toBe('Like added successfully');
        expect(response.body.token).toBeDefined();
        expect(response.body.updatedPost).toBeDefined();

      // Check if the comment was added to the post in the database
        const updatedPost = await Post.findById(mockPost._id);
        expect(updatedPost.likes).toBe(1);
    });
    });
});

beforeEach(async () => {
    await Post.deleteMany({});
    await User.deleteMany({});
});


describe('Put Likes Route', () => {
    describe('PUT /posts/:id/likes', () => {
    it('should add a like to a post then remove it', async () => {
      // Create a mock post in the database
        const mockPost = new Post({message: "howdy!", author: '6555fb6dc0a21062095c4a2b'});
        await mockPost.save();

        const likesData = {
        likes: 1,
    };
    const antilikesData = {
        likes: -1,
    };

        const response = await request(app)
        .put(`/posts/${mockPost._id}/likes`)
        .set('Authorization', `Bearer ${mockToken}`)
        .send(likesData)
        .expect(201);

        const response2 = await request(app)
        .put(`/posts/${mockPost._id}/likes`)
        .set('Authorization', `Bearer ${mockToken}`)
        .send(antilikesData)
        .expect(201);
    

      // Add assertions to check the response
        expect(response2.body.message).toBe('Like added successfully');
        expect(response2.body.token).toBeDefined();
        expect(response2.body.updatedPost).toBeDefined();

      // Check if the comment was added to the post in the database
        const updatedPost = await Post.findById(mockPost._id);
        expect(updatedPost.likes).toBe(0);
    });
    });
});

// describe('GET /posts/user/:authorId', () => {

//   let mockId1 = null;
//   let mockId2 = null;
//   const badMockId = convertStringToObjectId("655cb9ce68f96cfac7e37003");
//   const createTestUser = (testUserInfoObject) => {
//     let response = await request(app).post("/users").send(testUserInfoObject);
//     return response;
//   };



//   beforeEach(async () => {
//     await Post.deleteMany({});
//     await User.deleteMany({});
//     // Make two "real" users
//     const user1 = new User({ displayName: "A", email: "a@a.com", password: "aaaa" });
//     mockId1 = 
//   });

//   it('returns only the posts corresponding to authorId', async () => {
//     // Define two mock author IDs
//     const mockId1 = convertStringToObjectId("655cb9ce68f96cfac7e37001");
//     const mockId2 = convertStringToObjectId("655cb9ce68f96cfac7e37002");
//     const badMockId = convertStringToObjectId("655cb9ce68f96cfac7e37002");
//     // Create and save some mock posts
//     const mockPost1 = new Post({ message: "First post from user 1", author: mockId1 });
//     const mockPost2 = new Post({ message: "First post from user 2", author: mockId2 });
//     const mockPost3 = new Post({ message: "Second post from user 2", author: mockId2 });
//     [mockPost1, mockPost2, mockPost3].map(
//       (mockPost) => { mockPost.save(); }
//     );
//     // Get all posts by the first user
//   })
// });

describe('GET /posts/:id/likes', () => {
    // Use beforeEach to ensure a clean database state before each test
    beforeEach(async () => {
        await Post.deleteMany({});
        await User.deleteMany({});
    });

    it('should return post likes and token for a valid post ID', async () => {
        // Create a mock post in the database
        const mockPost = new Post({ message: "howdy!", author: '6555fb6dc0a21062095c4a2b', likes: 341 });
        await mockPost.save();

        // Mock user data for JWT token creation
        const mockUserData = { user_id: 'mockUserId' };
        // Mock JWT token
        const token = JWT.sign(mockUserData, process.env.JWT_SECRET);

        const response = await request(app)
            .get(`/posts/${mockPost._id}/likes`)
            .set('Authorization', `Bearer ${token}`);

        // Adjusted assertions based on your actual implementation
        expect(response.status).toBe(200);
        expect(response.body.likes).toBe(mockPost.likes);
        expect(response.body.token).toBeDefined();
    });

    });
})