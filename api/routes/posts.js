const express = require("express");
const router = express.Router();
const multer = require("multer");
const PostsController = require("../controllers/posts");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './frontend/public/uploads/'); //img filepath 
  },
  filename: function(req, file, cb) {
    cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname)); //img filename 
  }
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes= ['image/jpeg', 'image/jpg', 'image/png'];
  if(allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  } 
};

const upload = multer({storage, fileFilter});

router.get("/", PostsController.Index);
router.post("/", PostsController.Create);
router.post('/add', upload.single('img'), (req, res) => {
  const photo = req.file.filename;
  // handle the uploaded file here
});

module.exports = router;
