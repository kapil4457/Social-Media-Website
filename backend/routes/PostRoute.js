const express = require('express');
const { createPost, updatePost } = require('../controllers/PostController.js');
const { isAuthenticatedUser, authorizeRole } = require("../middleware/auth.js");
const router = express.Router()
module.exports = router;


router.route("/create/post").post( isAuthenticatedUser ,createPost);
router.route("/update/post").put( isAuthenticatedUser ,updatePost);
router.route("/delete/post").delete( isAuthenticatedUser ,updatePost);