const User = require("../models/user");
const TokenGenerator = require("../models/token_generator")
const bcrypt = require('bcrypt')

const TokensController = {

  Create: (req, res) => {
    const email = req.body.email;
    const password = req.body.password;



    
    User.findOne({ email: email }).then(async (user) => {
      if (!user) {
        console.log("auth error: user not found")
        res.status(401).json({ message: "auth error" });
      } else if (!await bcrypt.compare(password, user.password)) {
        console.log("auth error: passwords do not match")
        res.status(401).json({ message: "auth error" });
      } else {
        const token = await TokenGenerator.jsonwebtoken(user.id)
        res.status(201).json({ token: token, user: user, message: "OK" });
      }
    });
  }
};



// const loginUser = async (req, res) => {
//   const {email, password} = req.body
//   try {
//     const user = await User.login(email, password)
//     //create token here and add it to response
//     console.log(user)
//     const token = await TokenGenerator.jsonwebtoken(user.id)
//     res.status(200).json({ token: token, user: user, message: "OK" })
//   } catch (error) {
//     res.status(400).json({error: error.message})
//   }
// }
module.exports = TokensController;
