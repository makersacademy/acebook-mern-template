const { uploadFile } = require("../s3");
const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);

const ImagesController = {
  Create: async (req, res) => {
    const file = req.file;
    console.log(req.file);
    const result = await uploadFile(file);
    await unlinkFile(file.path);
    console.log(result.Location);
    res.status(200).json({ url: result.Location, message: "OK" });
  },
};

module.exports = ImagesController;
