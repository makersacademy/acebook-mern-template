const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = require('./middleware');
const UsersController = require('../controllers/users');

router.post('/', upload.single('image'), async (req, res) => {
  const user = await UsersController.Create(req, res);
});

module.exports = router;
