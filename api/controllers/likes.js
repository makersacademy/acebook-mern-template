const User = require("../models/post");

const LikesController = {
  Create: (req, res) => {
    const data = req.body
    console.log(`post_id is ${data.post_id}`);
    console.log(`user_id is `)
  }
}


module.exports = LikesController;
