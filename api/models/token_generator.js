const JWT = require('jsonwebtoken');

// Secret used for JWT
const secret = process.env.JWT_SECRET;

// Class with static method to generate (sign) JWT when passed user_id as argument

class TokenGenerator {
  static jsonwebtoken(user_id) {
    return JWT.sign(
      {
        user_id: user_id,
        iat: Math.floor(Date.now() / 1000),

        // Set the JWT token to expire in 10 minutes
        exp: Math.floor(Date.now() / 1000) + 10 * 60,
      },
      secret
    );
  }
}

module.exports = TokenGenerator;
