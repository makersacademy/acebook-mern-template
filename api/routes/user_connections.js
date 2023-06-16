const express = require("express");
const router = express.Router();

const UserConnectionsController = require("../controllers/user_connections.js");

router.patch("/", UserConnectionsController.AddFriend);
router.post("/", UserConnectionsController.GetFriends);

module.exports = router;
