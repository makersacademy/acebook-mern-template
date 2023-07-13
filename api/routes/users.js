const express = require("express");
const multer = require("multer");
const uuid = require("uuid");
const router = express.Router();

const UsersController = require("../controllers/users");

const storage = multer.diskStorage({
  destination: "profilePhotos/",
  filename: function (req, file, cb) {
    const uniqueFilename = `${uuid.v4()}-${file.originalname}`;
    cb(null, uniqueFilename);
  },
});

const upload = multer({ storage: storage });

router.get("/:id", UsersController.Profile);
router.post("/", upload.single("image"), UsersController.Create);

module.exports = router;
