const { uploadFile } = require("../s3");

const ImagesController = {
  Create: async (req, res) => {
    const file = req.file;
    console.log(req.file);
    console.log(process.env.REACT_APP_AWS_BUCKET_NAME);
    const result = await uploadFile(file);
    console.log(result.Location);
    res.status(200).json({ url: result.Location });
  },
};

module.exports = ImagesController;
