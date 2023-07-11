const TokenGenerator = require("../../models/token_generator");
const JWT = require("jsonwebtoken");

describe("TokenGenerator", () => {
  const FAKE_SECRET = "fake-secret";

  test("Generates a JWT for a given user id", () => {
    const userId = "12345";
    const token = TokenGenerator.jsonwebtoken(userId, FAKE_SECRET);

    expect(token).toBeDefined();

    // Verify token and check the payload
    const decodedToken = JWT.verify(token, FAKE_SECRET);
    expect(decodedToken).toBeDefined();
    expect(decodedToken.user_id).toBe(userId);

    // Check that the token expires in roughly 10 minutes
    const currentUnixTime = Math.floor(Date.now() / 1000);
    const expectedExpiry = currentUnixTime + 100 * 60;
    expect(Math.abs(decodedToken.exp - expectedExpiry)).toBeLessThanOrEqual(2);
  });
});
