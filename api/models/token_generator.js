const JWT = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

class TokenGenerator {
  static jsonwebtoken(user_id) {
    return JWT.sign({
      user_id: user_id,
      iat: Math.floor(Date.now() / 1000),
      
      // Set the JWT token to expire in 10 minutes
      // exp: Math.floor(Date.now() / 1000) + (10 * 60) // REAL LINE
      exp: Math.floor(Date.now() / 1000) + (100 * 60) // EXTENDED TOKEN LINE
    }, secret);
  }
}

module.exports = TokenGenerator;
