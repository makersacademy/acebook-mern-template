const cloudinary = require('cloudinary').v2;
require('dotenv').config();

cloudinary.config({
  cloud_name: 'de2y4osyf',
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
const uploadImage = async (file) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        { resource_type: 'image', format: 'jpg' },
        (error, apiResult) => {
          if (error) {
            reject(error);
          } else {
            resolve(apiResult.url);
          }
        }
      )
      .end(file.buffer);
  });
};

module.exports = uploadImage;
