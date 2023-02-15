const User = require("../models/user");

const UsersController = {
	Create: async (req, res) => {
		const existingUser = await User.exists({ email: req.body.email });
		if (existingUser) {
			return res.status(400).json({ message: "Email already in use" });
		}

		const newUser = new User(req.body);
		newUser.save((err) => {
			if (err) {
				res.status(400).json({ message: err.message });
			} else {
				res.status(201).json({ message: "Thanks! your account has been successfully created." });
			}
		});
	},
};

module.exports = UsersController;
