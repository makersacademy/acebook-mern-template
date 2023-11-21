const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/users");

// creates PostsController in order to use getPostsByUsername
const PostsController = require("../controllers/posts");

router.post("/", UsersController.Create);
router.get("/", UsersController.GetUserEmails);

// new router for backend of frontend users/my_account and users/userProfileFeed for GET request to obtain user data based on user_id
router.get("/data/:user_id", UsersController.DisplayUserData);

router.get("/profile/:user_id", PostsController.FindPostsByUserId);

// new router for backend users/avatar for POST request changing the chosen avatar
router.post("/avatar", UsersController.ChangeAvatar);

module.exports = router;
