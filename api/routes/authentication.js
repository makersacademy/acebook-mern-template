const express = require("express");
const router = express.Router();
const JWT = require('jsonwebtoken');

const AuthenticationController = require("../controllers/authentication");

router.post("/", AuthenticationController.Authenticate);

router.get('/verifyToken', (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const secret = process.env.JWT_SECRET; // use environment variable

    JWT.verify(token, secret, (err, decoded) => {
        if (err) {
            res.status(401).json({ valid: false });
        } else {
            res.json({ valid: true });
        }
    });
});

module.exports = router;
