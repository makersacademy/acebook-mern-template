const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/users");

// creates PostsController in order to use getPostsByUsername
const PostsController = require("../controllers/posts");

router.post("/", UsersController.Create);

router.get("/profile/:user_id", PostsController.FindPostsByUserId);

// new router for backend users/avatar for POST request changing the chosen avatar
router.post("/avatar", UsersController.ChangeAvatar);

module.exports = router;
