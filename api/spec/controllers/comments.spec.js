const app = require("../../app");
const request = require("supertest");
require("../mongodb_helper");
const User = require('../../models/user');
const Comment = require('../../models/comment');
const JWT = require("jsonwebtoken");
// TODO: Add mocking in place for Mongoose models
const secret = process.env.JWT_SECRET;

let token;

const requestMaker = async (postRoute,token,{comment,post_id,user_id}) =>  await request(app)
    .post(postRoute)
    .set("Authorization", `Bearer ${token}`)
    .send({ comment, post_id,user_id, token});
const getRequestMaker = async () => request(app).get("/comments")
const addComments = async () => {
    await  Comment.create({comment: "howdy!"});
    await Comment.create({comment: "hola!"});
}
describe("/comments", () => {
    beforeAll( async () => {
        const user = new User({email: "test@test.com", password: "12345678"});
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
        await Comment.deleteMany({});
    })

    afterAll( async () => {
        await User.deleteMany({});
        await Comment.deleteMany({});
    })

    describe("POST, when token is present", () => {
        it("responds with a 201", async () => {
            let res = await requestMaker(
                "/comments",
                token,
                {
                    comment:"initial Comment",
                    post_id:"1",
                    user_id:"2"
                })

            expect(res.status).toEqual(201);
        });

        it("creates multiples Comments for single post", async () => {
           await requestMaker(
                "/comments",
                token,
                {
                    comment:"Hello World!!!",
                    post_id:"1",
                    user_id:"5"
                })
         await requestMaker(
                "/comments",
                token,
                {
                    comment:"Howdy World!",
                    post_id:"1",
                    user_id:"2"
                })

            let comments = await Comment.find({post_id:"1"});
            expect(comments.length).toEqual(2);
            expect(comments[0].post_id).toEqual("1");
            expect(comments[0].user_id).toEqual("5");
            expect(comments[0].comment).toEqual("Hello World!!!");
            expect(comments[1].post_id).toEqual("1");
            expect(comments[1].user_id).toEqual("2");
            expect(comments[1].comment).toEqual("Howdy World!");
        });

        it("returns a new token", async () => {
            let res = await requestMaker(
                "/comments",
                token,
                {
                    comment:"Hello World!!! for a second time!!!",
                    post_id:"1",
                    user_id:"5"
                })

            let newPayload = JWT.decode(res.body.token, process.env.JWT_SECRET);
            let originalPayload = JWT.decode(token, process.env.JWT_SECRET);
            expect(newPayload.iat > originalPayload.iat).toEqual(true);
        });
    });

    describe("POST, when token is missing", () => {
        it("responds with a 401", async () => {
            let res = await requestMaker(
                "/comments",
                "",
                {
                    comment:"Hello World!!! for a second time!!!",
                    post_id:"1",
                    user_id:"5"
                })

            expect(res.status).toEqual(401);
        });

        it("a comment is not created", async () => {
         await requestMaker(
                "/comments",
                "",
                {
                    comment:"Hello World!!! for a second time!!!",
                    post_id:"1",
                    user_id:"5"
                })
            let posts = await Comment.find();
            expect(posts.length).toEqual(0);
        });

        it("a token is not returned", async () => {
            let res = await requestMaker(
                "/comments",
                "",
                {
                    comment:"Hello World!!! for a second time!!!",
                    post_id:"1",
                    user_id:"5"
                })
            expect(res.body.token).toEqual(undefined);
        });
    })

    describe("GET, when token is present", () => {
        it("returns every comment in the collection", async () => {
            await addComments()

            let res = await request(app)
                .get("/comments")
                .set("Authorization", `Bearer ${token}`)
                .send({token: token});
            let messages = res.body.comments.map((post) => ( post.comment ));
            expect(messages).toEqual(["howdy!", "hola!"]);
        })

        it("the response code is 200", async () => {
            await addComments()
            let response = await request(app)
                .get("/comments")
                .set("Authorization", `Bearer ${token}`)
                .send({token});
            console.log(response.body)
            expect(response.status).toEqual(200);
        })

        it("returns a new token", async () => {
            await addComments()
            let response = await request(app)
                .get("/comments")
                .set("Authorization", `Bearer ${token}`)
                .send({token});
            let newPayload = JWT.decode(response.body.token, process.env.JWT_SECRET);
            let originalPayload = JWT.decode(token, process.env.JWT_SECRET);
            expect(newPayload.iat > originalPayload.iat).toEqual(true);
        })
    })

    describe("GET, when token is missing", () => {
        it("returns no posts", async () => {
            await addComments()
            let response = await getRequestMaker()
            expect(response.body.comments).toEqual(undefined);
        })

        it("the response code is 401", async () => {
            await addComments()
            let response = await getRequestMaker()
            expect(response.status).toEqual(401);
        })

        it("does not return a new token", async () => {
      await addComments()
            let response = await getRequestMaker()
            expect(response.body.token).toEqual(undefined);
        })
    })
});
