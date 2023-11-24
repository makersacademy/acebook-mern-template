const express = require("express");
const router = express.Router();

const PostsController = require("../controllers/posts");
const UsersController = require("../controllers/users");

router.get("/:user_id", PostsController.FindPostsByUserId);
router.get("/users/userinfo/:user_id", UsersController.FindInfoByUserId);

module.exports = router;