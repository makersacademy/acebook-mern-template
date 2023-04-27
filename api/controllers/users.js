const User = require("../models/user");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const { uploadFile } = require("../s3");

module.exports.upload=(upload.single('image')), (req, res, next)=>{
  next();
};

module.exports.UsersController = {
  Create: (req, res) => {
    // upload.single('image'); // <=== this is were we stopped !!!
    const user = new User(req.body);
    user.save((err) => {
      if (err) {
        res.status(400).json({ message: "Bad request" });
      } else {
        res.status(201).json({ message: "OK" });
      }
    });
  },
};

// module.exports = UsersController;

// upload.single("image")