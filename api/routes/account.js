const express = require('express');
const router = express.Router();
const upload = require('./middleware');
const AccountController = require('../controllers/account');

router.get('/', AccountController.Index);
router.put('/', upload.single('image'), AccountController.Update);

module.exports = router;
