const request = require("supertest");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const app = require("../../app");
const User = require("../../models/user");
const Image = require("../../models/image");
require("../mongodb_helper");

let token;
let user;

const generateBackdatedToken = (userId) =>
  jwt.sign(
    {
      userId,
      // Backdate this token of 5 minutes
      iat: Math.floor(Date.now() / 1000) - 5 * 60,
      // Set the JWT token to expire in 10 minutes
      exp: Math.floor(Date.now() / 1000) + 10 * 60,
    },
    process.env.JWT_SECRET
  );

describe("/images", () => {
  beforeAll(async () => {
    user = new User({
      name: "testy mctestface",
      username: "testuser",
      email: "test@test.com",
      password: bcrypt.hashSync("12345678", bcrypt.genSaltSync()),
    });
    await user.save();
    token = generateBackdatedToken(user.id);
  });

  beforeEach(async () => {
    await Image.deleteMany({});
  });

  afterAll(async () => {
    await User.deleteMany({});
    await Image.deleteMany({});
  });

  describe("GET, when token is present", () => {
    it("should return every image in the collection", async () => {
      // create 2 fake image records on the db
      const imageOne = new Image({ publicId: "1234", userId: user.id });
      const imageTwo = new Image({ publicId: "2345", userId: user.id });
      await imageOne.save();
      await imageTwo.save();

      // mock the request
      const serverMock = request(app);
      const response = await serverMock
        .get("/images")
        .set("Authorization", `Bearer ${token}`);
      const imagesId = response.body.images.map((image) => image.publicId);

      // assert
      expect(response.status).toEqual(200);
      expect(imagesId).toEqual(["1234", "2345"]);
    });
  });

  describe("GET, when token is missing", () => {
    it("should not return anything without the token", async () => {
      // create 2 fake image records on the db
      const imageOne = new Image({ publicId: "1234", userId: user.id });
      const imageTwo = new Image({ publicId: "2345", userId: user.id });
      await imageOne.save();
      await imageTwo.save();

      // mock the request
      const serverMock = request(app);
      const response = await serverMock.get("/images");

      // assert
      expect(response.status).toEqual(401);
      expect(response.body.images).toEqual(undefined);
      expect(response.body.token).toEqual(undefined);
    });
  });

  describe("POST, when token is present", () => {
    it("should return an object with public_id, token and new image record", async () => {
      const serverMock = request(app);
      const response = await serverMock
        .post("/images")
        .set("Authorization", `Bearer ${token}`)
        .send({ publicId: "1234567" });
      expect(response.status).toEqual(200);
      expect(response.body.image).toBeDefined();
      expect(response.body.token).toBeDefined();
      expect(response.body.public_id).toEqual("1234567");
    });
  });

  describe("POST, when token is missing", () => {
    it("should return an object with public_id, token and new image record", async () => {
      const serverMock = request(app);
      const response = await serverMock
        .post("/images")
        .send({ publicId: "1234567" });

      expect(response.status).toEqual(401);
      expect(response.body.image).toEqual(undefined);
      expect(response.body.token).toEqual(undefined);
      expect(response.body.public_id).toEqual(undefined);
    });
  });
});
