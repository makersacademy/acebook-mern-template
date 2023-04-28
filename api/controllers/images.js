const { uploadFile } = require("../s3");

const ImagesController = {
  Create: async (req, res) => {
    const file = req.file;
    const result = await uploadFile(file);
    console.log(result);
  },
};

module.exports = ImagesController;
