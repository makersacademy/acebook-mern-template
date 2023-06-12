// const jwt_decode = require('jwt-decode');
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;
// idk if we need that ^

// const tokenDecoder = (token) => {
//   try {
//     return jwt_decode(token);
//   } catch (error) {
//     return null;
//   }
// }

const tokenDecoder = (token) => {
  try {
    const decoded = jwt.decode(token, secret);
    return decoded;
  } catch (error) {
    return null;
  }
}



module.exports = tokenDecoder;