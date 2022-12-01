/**
 * initiate Express and access the router method
 */
const express = require("express");
const router = express.Router();

// import tokens controller (which contains token methods)
const TokensController = require("../controllers/tokens");

// route equivalent to POST /tokens/
router.post("/", TokensController.Create);

module.exports = router;
