const User = require("../models/user");
const { validateEmail } = require("../helpers/validation");

const UsersController = {
  Create: (req, res) => { 
    const user = new User(req.body);
    if(!validateEmail(user.email)){
       res.status(400).json({
        message: 'Invalid email address!'
      })
    } else {
      user.save((err) => {
      if (err) {
        res.status(400).json({message: 'Bad request'})    
      } else {
        res.status(201).json({ message: 'OK' });
      }
    });
  }   
  },

  //Maybe could be used tp upload the image instead of sending url
  // UploadProfilePicture: async (req, res) => {
  //   try {
  //     if (!req.file) {
  //       throw new Error("No file uploaded");
  //     }
  
  //     const result = await cloudinary.uploader.upload(req.file.path);
  //     res.json({message : "Image uploaded successfully", url: result.secure_url })
  //     return result.secure_url
  
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ error: error.message });
  //   }
  // }
};



module.exports = UsersController;
