const express = require("express");
const router = express.Router();
const upload = require("../config/multer");

const UsersController = require("../controllers/users");

router.post("/", UsersController.Create);
router.get("/", UsersController.Find);
router.post("/bio/:id", UsersController.UpdateBio);
router.post("/profile-picture/:id", upload.single("image"), UsersController.UploadProfilePicture);
router.put("/profile-picture/:id", UsersController.UpdateProfilePictureURL);

module.exports = router;
