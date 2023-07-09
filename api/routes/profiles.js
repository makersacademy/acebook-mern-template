const express = require("express");
const router = express.Router();
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const ProfileController = require("../controllers/profiles");

// Define routes for profiles
router.get("/:id", ProfileController.GetProfile);
router.patch("/:id", ProfileController.UpdateProfile);
router.patch(
  "/:id/profileImage",
  upload.single("image"),
  ProfileController.UpdateProfileImage
);

router.get("/:id/profileImage", ProfileController.GetProfileImage);

module.exports = router;
