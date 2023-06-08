const jwt_decode = require('jwt-decode');
const secret = process.env.JWT_SECRET;
// idk if we need that ^

const tokenDecoder = (token) => {
  try {
    return jwt_decode(token);
  } catch (error) {
    return null;
  }
}



module.exports = tokenDecoder;