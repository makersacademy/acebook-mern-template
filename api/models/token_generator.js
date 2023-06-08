const JWT = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

class TokenGenerator {
  static jsonwebtoken(user_id, user_name) {

    console.log(user_id);
    console.log(user_name);
    
    return JWT.sign({
      user_id: user_id,
      user_name: user_name,
      iat: Math.floor(Date.now() / 1000),
      
      // Set the JWT token to expire in 10 minutes
      exp: Math.floor(Date.now() / 1000) + (10 * 60)
    }, secret);
  }
}

module.exports = TokenGenerator;
