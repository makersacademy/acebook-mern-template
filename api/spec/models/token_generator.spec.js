const TokenGenerator = require("../../models/token_generator");
const JWT = require("jsonwebtoken");

describe("TokenGenerator", () => {
  describe("jsonwebtoken", () => {
    test("returns a token containing user_id that is valid for 10 minutes", () => {
      const user_id = 1;
      const token = TokenGenerator.jsonwebtoken(user_id);
      const payload = JWT.decode(token, process.env.JWT_SECRET);
      expect(payload.user_id).toEqual(user_id);
      expect(payload.exp - payload.iat).toEqual(600);
    });

    test("Token is not valid after 10 minutes", (done) => {
      const user_id = 1;
      const token = TokenGenerator.jsonwebtoken(user_id);
      const payload = JWT.decode(token, process.env.JWT_SECRET);

      JWT.verify(
        token,
        process.env.JWT_SECRET,
        { clockTimestamp: payload.iat + 601 },
        (err, decoded) => {
          expect(err).not.toBeUndefined()
          expect(decoded).toBeUndefined()
          done();
        }
      );
    });
  });
});

