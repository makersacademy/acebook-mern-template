const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
const validateEmail = (email) => {
	const emailToCheck = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	return emailToCheck.test(email);
};

const UserSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		validate: [validateEmail, "Please use a valid email address"],
	},
	password: { type: String, required: true, minlength: 4, maxlength: 10 },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
