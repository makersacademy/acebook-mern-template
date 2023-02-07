const JWT = require('jsonwebtoken');

// Secret used for JWT
const secret = process.env.JWT_SECRET;

// Class with static method to generate (sign) JWT when passed user_id as argument

class TokenGenerator {
  // Generate JWT token with the user_id provided and an expiration date 10 minutes from now
  static jsonwebtoken(user_id) {
    return JWT.sign(
      {
        // Payload with the user_id
        user_id: user_id,
        // Timestamp of when the JWT was created (issued at)
        iat: Math.floor(Date.now() / 1000),
        // Timestamp of when the JWT token will expire
        exp: Math.floor(Date.now() / 1000) + 10 * 60,
      },
      // The secret used to sign the JWT
      secret
    );
  }
}

module.exports = TokenGenerator;
