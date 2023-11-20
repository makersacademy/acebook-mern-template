const express = require("express");
const router = express.Router();

const PostsController = require("../controllers/posts");

router.get("/", PostsController.Index);

// image_path string and image_file passed so two controller methods used
// Handle the case where there's no image file
router.post("/", (req, res, next) => {
    if (req.file) {
        PostsController.Upload(req, res, next);
    } else {
        // If no image file is present, skip the Upload
        next()
    }
}, PostsController.Create);

module.exports = router;
