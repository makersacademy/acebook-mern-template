const express = require("express");
const router = express.Router();

const FriendsController = require("../controllers/friends");

router.get("/", FriendsController.GetFriendsByUser);
router.post("/:id", FriendsController.SendFriendRequest);
router.post("/cancel/:id", FriendsController.CancelFriendRequest);
router.post("/accept/:id", FriendsController.AcceptFriendRequest);
router.post("/reject/:id", FriendsController.RejectFriendRequest);
