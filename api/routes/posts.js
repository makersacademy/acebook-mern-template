const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

// Define the storage options for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const fileName = `${Date.now()}${path.extname(file.originalname)}`;
    cb(null, fileName);
  },
});

// Define the filter function to only allow image files
const imageFilter = (req, file, cb) => {
  const allowedFileTypes = ["image/jpeg", "image/png", "image/gif"];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
};

// Set up multer with the storage and filter options
const upload = multer({ storage: storage, fileFilter: imageFilter });
const PostsController = require("../controllers/posts");

router.get("/", PostsController.Index);
router.post("/", upload.single("image"), PostsController.Create);
router.post("/:id/comments", PostsController.CreateComment);
router.patch("/:id", PostsController.Update);

module.exports = router;