const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/users");

router.get("/:userId", UsersController.FriendsData);
router.post("/", UsersController.SendFriendRequest);
router.post("/accept/", UsersController.AcceptFriendRequest);
router.post("/cancel/", UsersController.CancelFriendRequest);
router.post("/reject/", UsersController.RejectFriendRequest);
router.post("/delete/", UsersController.RemoveFriend);

module.exports = router;