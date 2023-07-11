const app = require("../../app");
const request = require("supertest");
const mongoose = require("mongoose");
require("../mongodb_helper");
const User = require("../../models/user");
const Post = require("../../models/post");
const Notification = require("../../models/notification");
const TokenGenerator = require("../../models/token_generator");

describe("/notifications", () => {
  describe("it works", () => {
    let user;
    let post;
    let notification;

    beforeEach(async () => {
      user = new User({
        email: "test@test.com",
        password: "12345678",
        username: "test",
      });
      await user.save();

      post = new Post({
        username: user.username,
        message: "This is a test post",
        authorId: user._id,
      });
      await post.save();

      notification = new Notification({
        type: "mention",
        postId: post._id,
        userId: user._id,
        message: `You have been mentioned in a post by the user @${user.username}.`,
      });
      await notification.save();
    });

    afterEach(async () => {
      await User.deleteMany({});
      await Post.deleteMany({});
      await Notification.deleteMany({});
    });

    test("notifications are returned for a valid user ID", async () => {
      const token = await TokenGenerator.jsonwebtoken(user._id);
      let response = await request(app)
        .get("/notifications")
        .set("Authorization", `Bearer ${token}`);
      expect(response.status).toEqual(200);
      expect(response.body.notifications).not.toEqual(undefined);
      expect(response.body.notifications.length).toBeGreaterThan(0);
    });

    test("no notifications are returned for a user with no notifications", async () => {
      const newUser = new User({
        email: "new@test.com",
        password: "12345678",
        username: "newtest",
      });
      await newUser.save();

      const token = await TokenGenerator.jsonwebtoken(newUser._id);
      let response = await request(app)
        .get("/notifications")
        .set("Authorization", `Bearer ${token}`);
      expect(response.status).toEqual(200);
      expect(response.body.notifications).toEqual([]);
    });
  });
});
