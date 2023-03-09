const jwt = require("jsonwebtoken");
const generateToken = require("../../models/token_generator");

describe("generateToken", () => {
  test("returns a token containing userId that is valid for 10 minutes", () => {
    const userId = 1;
    const token = generateToken(userId);
    const payload = jwt.decode(token, process.env.JWT_SECRET);
    expect(payload.userId).toEqual(userId);
    expect(payload.exp - payload.iat).toEqual(600);
  });
});
