const express = require('express');
const { createPost } = require('../controllers/PostController.js');
const { isAuthenticatedUser, authorizeRole } = require("../middleware/auth.js");
const router = express.Router()
module.exports = router;


router.route("/create/post").post( isAuthenticatedUser ,createPost);