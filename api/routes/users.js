const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/users");

router.post("/", UsersController.Create);
router.get("/display-name", UsersController.FindSingleDisplayNameById);
router.get("/", UsersController.Index);

  // NEED TO RETURN TO THIS (TODO)
  // router.get("/users", UsersController.FindAll);

module.exports = router;
