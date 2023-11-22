const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/users");

router.post("/", UsersController.Create);
router.get("/user", UsersController.FindSingleUserById);
router.put('/likes', UsersController.AddOrRemovePostIdtoUserifLikedOrUnliked);

  // NEED TO RETURN TO THIS (TODO)
  // router.get("/users", UsersController.FindAll);

module.exports = router;
