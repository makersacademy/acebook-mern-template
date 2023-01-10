const express = require("express");
const router = express.Router();

const FriendsController = require("../controllers/friends");

router.post("/", FriendsController.AddFriend);

module.exports = router;