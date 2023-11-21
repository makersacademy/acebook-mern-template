const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/users");


router.post("/", UsersController.Create);
router.put('/:id/likes', UsersController.AddOrRemovePostIdtoUserifLikedOrUnliked);
module.exports = router;
