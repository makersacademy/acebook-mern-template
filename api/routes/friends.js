const express = require("express");
const router = express.Router();

const FriendsController = require("../controllers/friends");

router.post("/", FriendsController.AddFriend);
router.get('/', FriendsController.GetFriends)

module.exports = router;