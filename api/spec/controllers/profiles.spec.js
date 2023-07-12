const app = require("../../app");
const request = require("supertest");
require("../mongodb_helper");
const User = require("../../models/user");
const JWT = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

let token;

describe("/profiles", () => {
  let testUser;

  beforeAll(async () => {
    testUser = new User({
      email: "user@testing.com",
      password: "12345678",
      username: "testUser",
    });
    await testUser.save();

    token = JWT.sign(
      {
        user_id: testUser.id,
        // Backdate this token of 5 minutes
        iat: Math.floor(Date.now() / 1000) - 5 * 60,
        // Set the JWT token to expire in 10 minutes
        exp: Math.floor(Date.now() / 1000) + 10 * 60,
      },
      secret
    );
  });

  afterAll(async () => {
    await User.deleteMany({});
  });

  describe("GET /profiles/:id, when token is present", () => {
    test("responds with a 200", async () => {
      let response = await request(app)
        .get(`/profiles/${testUser._id}`)
        .set("Authorization", `Bearer ${token}`)
        .send({ token: token });
      expect(response.status).toEqual(200);
    });

    test("returns the user profile", async () => {
      let response = await request(app)
        .get(`/profiles/${testUser._id}`)
        .set("Authorization", `Bearer ${token}`)
        .send({ token: token });
      expect(response.body.name).not.toBeUndefined();
    });

    test("returns a new token", async () => {
      let response = await request(app)
        .get(`/profiles/${testUser._id}`)
        .set("Authorization", `Bearer ${token}`)
        .send({ token: token });
      let newPayload = JWT.decode(response.body.token, process.env.JWT_SECRET);
      let originalPayload = JWT.decode(token, process.env.JWT_SECRET);
      expect(newPayload.iat > originalPayload.iat).toEqual(true);
    });
  });

  describe("GET /profiles/:id, when token is missing", () => {
    test("responds with a 401", async () => {
      let response = await request(app).get(`/profiles/${testUser._id}`);
      expect(response.status).toEqual(401);
    });

    test("does not return a profile", async () => {
      let response = await request(app).get(`/profiles/${testUser._id}`);
      expect(response.body).toEqual({ message: "auth error" });
    });

    test("does not return a new token", async () => {
      let response = await request(app).get(`/profiles/${testUser._id}`);
      expect(response.body.token).toEqual(undefined);
    });
  });

  describe("PUT /profiles/:id, when token is present", () => {
    test("responds with a 200", async () => {
      let response = await request(app)
        .patch(`/profiles/${testUser._id}`)
        .set("Authorization", `Bearer ${token}`)
        .send({ name: "updatedName", bio: "updatedBio", token: token });
      expect(response.status).toEqual(200);
    });

    test("updates the user profile", async () => {
      let response = await request(app)
        .get(`/profiles/${testUser._id}`)
        .set("Authorization", `Bearer ${token}`)
        .send({ token: token });
      expect(response.body.name).toEqual("updatedName");
      expect(response.body.bio).toEqual("updatedBio");
    });
  });

  describe("PATCH /profiles/:id/profileImage, when token is present", () => {
    test("responds with a 200 and updates the user profile image", async () => {
      const fakeFile = {
        originalname: "test_image.jpg",
        buffer: Buffer.from("fake_image_data"),
      };

      const response = await request(app)
        .patch(`/profiles/${testUser._id}/profileImage`)
        .set("Authorization", `Bearer ${token}`)
        .attach("image", fakeFile.buffer, fakeFile.originalname);

      expect(response.status).toEqual(200);

      // Add more assertions here if needed, such as checking the response message
      expect(response.body.message).toEqual(
        "Profile image updated successfully."
      );
    });

    test("the profile image can be retrieved with a GET request", async () => {
      const response = await request(app)
        .get(`/profiles/${testUser._id}/profileImage`)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toEqual(200);
      // Convert the image data back to a string for the comparison
      expect(response.body.toString()).toEqual("fake_image_data");
    });
  });

  describe("GET /profiles/:id, when the user does not exist", () => {
    test("responds with a 404", async () => {
      const nonExistentUserId = "60b1f1dbf79bd5717839b625"; // just an example, use a valid but non-existent id
      let response = await request(app)
        .get(`/profiles/${nonExistentUserId}`)
        .set("Authorization", `Bearer ${token}`);
      expect(response.status).toEqual(404);
      expect(response.body.message).toEqual("User not found");
    });
  });

  describe("PATCH /profiles/:id/profileImage, when no image file is received", () => {
    test("responds with a 400", async () => {
      let response = await request(app)
        .patch(`/profiles/${testUser._id}/profileImage`)
        .set("Authorization", `Bearer ${token}`);
      expect(response.status).toEqual(400);
      expect(response.body.message).toEqual("No image file received");
    });
  });

  describe("GET /profiles/:id, when a server error occurs", () => {
    test("responds with a 500", async () => {
      // Temporarily replace findById with a function that throws an error
      User.findById = jest.fn().mockImplementation(() => {
        throw new Error("Server error");
      });

      let response = await request(app)
        .get(`/profiles/${testUser._id}`)
        .set("Authorization", `Bearer ${token}`);
      expect(response.status).toEqual(500);
      expect(response.body.error).toEqual("Error: Server error");

      // Restore findById to its original implementation
      User.findById = jest.fn().mockImplementation(User.findById);
    });
  });
});
