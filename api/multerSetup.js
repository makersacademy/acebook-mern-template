const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const fs = require('fs')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const pathToReactPublic = path.join(__dirname, '..', 'frontend', 'public', 'uploads')
    if (!fs.existsSync(pathToReactPublic)) { 
      fs.mkdirSync(pathToReactPublic, { recursive: true }); // creates folders if don't exist
    }
    cb(null, pathToReactPublic); //img filepath
  },

  filename: (req, file, cb) => {
    cb(null, `${uuidv4()}-${Date.now()}${path.extname(file.originalname)}`); //img filename 
  }
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  
  if (allowedFileTypes.includes(file.mimetype)) { cb(null, true); }
  else { cb(null, false); } 
};

const upload = multer({ storage, fileFilter });

module.exports = upload