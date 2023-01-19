const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/users");

// router.get("/", UsersController.FriendData);
router.post("/", UsersController.SendFriendRequest);
router.post("/accept/", UsersController.AcceptFriendRequest);
router.post("/reject/", UsersController.RejectOrCancelFriendRequest);
router.post("/delete/", UsersController.RemoveFriend);

module.exports = router;