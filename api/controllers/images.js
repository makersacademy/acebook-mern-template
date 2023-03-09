// const { fetch } = require("node-fetch");
const Image = require("../models/image");
const generateToken = require("../models/token_generator");

const cloudName = "ddav2oh8j";

// returns all images from the db
const getAllImages = async (req, res) => {
  try {
    // grabs all images from db
    const images = await Image.find();
    const token = await generateToken(req.userId);
    // returns a list of images
    res.status(200).json({ images, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// gets the file from frontend and returns a public_id
const uploadImage = async (req, res) => {
  try {
    // passes the req body to the Cloudinary API
    const formData = new FormData();
    formData.append("file", req.file);
    formData.append("upload_preset", "llzecft2");
    // exracts the public_id from the data
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`
    );
    const publicId = response.data.public_id;
    // save the public_id to the db
    const newImage = await Image.create({ publicId, userId: req.userId });
    // new token
    const token = await generateToken(req.userId);
    // return public_id as a res
    res.status(200).json({ image: newImage, token, public_id: publicId });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getAllImages, uploadImage };
