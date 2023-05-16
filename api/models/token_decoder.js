const JWT = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

class TokenDecoder {
  static decode(token) {
    
    return JWT.decode(token)
  }
}

module.exports = TokenDecoder;
