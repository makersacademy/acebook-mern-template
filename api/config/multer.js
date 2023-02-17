const multer = require("multer");
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
  folder: 'acebook-image-uploads',
  format: async (req, file) => 'png', // or any other format you like
  public_id: (req, file) => (Date.now() + "-" + file.originalname)
  }
  });
const upload = multer({ storage: storage });

module.exports = upload