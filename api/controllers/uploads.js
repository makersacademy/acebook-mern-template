const multer = require("multer");
const Post = require("../models/post");
const TokenGenerator = require("../lib/token_generator");
// define where images are stored
const storage = multer.diskStorage({
  destination: "../uploads",
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage }).single("file");

// upload image to //uploads and replace name in database
const UploadsController = {
  AddImage: async (req, res) => {
    upload(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(500).json(err);
      } else if (err) {
        return res.status(500).json(err);
      }

      const filename = req.file.filename;
      const post_id = req.body.post_id;

      // replace filename: null with new filename
      const result = await Post.findOneAndUpdate(
        { _id: post_id },
        { $set: { image_path: filename } },
      );
      return res.status(200).send(filename);
    });
  },
};

module.exports = UploadsController;
