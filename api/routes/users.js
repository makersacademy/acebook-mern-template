const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/users");
// creates PostsController in order to use getPostsByUsername
const PostsController = require("../controllers/posts");
router.get("/usernames", UsersController.GetUsernames);

router.post("/", UsersController.Create);

router.get("/emails", UsersController.GetUserEmails);

router.get("/userinfo/:user_id", UsersController.FindInfoByUserId);


// new router for backend users/avatar for POST request changing the chosen avatar
router.post("/avatar", UsersController.ChangeAvatar);

module.exports = router;
