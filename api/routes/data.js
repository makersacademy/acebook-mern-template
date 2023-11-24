const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/users");

// new router for backend of frontend users/my_account and users/userProfileFeed for GET request to obtain user data based on user_id
// TODO: empty route /
router.get("/", UsersController.DisplayUserData);
// localhost:8080/users/data/:user_id/data/:user_id
router.post("/user", UsersController.DisplayUserDataById);

module.exports = router;