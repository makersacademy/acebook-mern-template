const Notification = require("../models/notification");
const TokenGenerator = require("../models/token_generator");
const User = require("../models/user");

const NotificationController = {
  Index: (req, res) => {
    Notification.find({ userId: req.user_id }, async (err, notifications) => {
      if (err) {
        throw err;
      }
      const token = await TokenGenerator.jsonwebtoken(req.user_id);
      res.status(200).json({ notifications: notifications, token: token });
    });
  },
};

module.exports = NotificationController;
