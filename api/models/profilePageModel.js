const mongoose = require("mongoose")

const profileSchema = new mongoose.Schema({
    email: { type: String, required: true},
    firstName: { type: String, required: true},
    lastName: { type: String, required: true},
    picture: { type: Buffer, required: true},
    password: { type: String, required: true}
})

// add method to update user info

const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;