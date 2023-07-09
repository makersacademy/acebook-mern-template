const express = require("express");
const router = express.Router();
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const ProfileController = require("../controllers/profiles");

// Define routes for profiles
router.get("/", ProfileController.GetProfile);
router.patch("/", ProfileController.UpdateProfile);
router.patch(
  "/profileImage",
  upload.single("image"),
  ProfileController.UpdateProfileImage
);

router.get("/profileImage", ProfileController.GetProfileImage);

module.exports = router;
