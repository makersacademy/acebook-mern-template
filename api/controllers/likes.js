const User = require("../models/post");

const LikesController = {
  Create: (req, res) => {
    const data = req.body
    const post_id = data.post_id
    const user_id = req.user_id
    
    console.log(`post_id is ${post_id}`);
    console.log(`user_id is ${user_id}`);
  }
}


module.exports = LikesController;
