const express = require("express");
const router = express.Router();

const PostsController = require("../controllers/posts");

router.get("/", PostsController.Index);
router.post("/", PostsController.Create);
//router.delete("/", PostsController.Delete);
// router.update('/', PostsController.Update);

module.exports = router;
