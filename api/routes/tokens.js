const express = require("express");
const router = express.Router();

const SessionsController = require("../controllers/tokens");
// const TokensController = require("../controllers/tokens"); - Was this previously

router.post("/", SessionsController.Create);
// router.post("/", TokensController.Create); - Was this previously

module.exports = router;
