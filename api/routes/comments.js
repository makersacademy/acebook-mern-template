// Import express package 
const express = require ("express")

// Create a new router
const router = express.Router();

// Import the controller 
const CommentsController = require('../controllers/comments');

// Add routes 

router.post("/", CommentsController.Create);

module.exports = router;
