const mongoose = require('mongoose')
const User = require('./user')

const ImageSchema = new mongoose.Schema({
  image: {
    fileName: String,
    contentType: String
  },
  uploadDate: {
    type: Date,
    default: () => Date.now()
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

const Image = mongoose.model('Image', ImageSchema)

module.exports = Image